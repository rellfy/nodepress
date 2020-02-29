import Fastify from 'fastify';
import Mongoose from "mongoose";
import { ServerResponse, IncomingMessage } from 'http';
import { Route } from "../../../components/router/Route";
import { RouteModel } from "../../../components/router/RouteModel";
import { Router } from "../../../components/router/Router";
import { Config } from '../../../Config';
import fs from "fs";
import cache from '../../../Cache';
import { Token } from '../Token';
import { User } from '../User';

type LoginData = {
    username: string,
    password: string
};

class LoginRoute extends Route {

    public get route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/login',
            auth: false,
            schema : { indexRoute: true },
            handler: (request: Fastify.FastifyRequest<IncomingMessage>, response: Fastify.FastifyReply<ServerResponse>) => this.process(request, response, '/')
        });
    }
}

class LoginAction extends Route {

    private static RootLogin: LoginData;

    constructor() {
        super();

        let config: Config = JSON.parse(fs.readFileSync(cache.get('config_path')).toString());
        
        // Cache root login data.
        LoginAction.RootLogin = {
            username: 'root',
            password: config.user.root.password
        };
    }

    public get route(): RouteModel {
        return new RouteModel({
            method: 'POST',
            endpoint: '/login',
            auth: false,
            schema : {
                body: {
                    username: { type: 'string', required: true },
                    password: { type: 'string', required: true }
                }
            },
            handler: this.process.bind(this)
        });
    }

    public async process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>) {
        await super.process(request, reply);

        const data: LoginData = {
            username: request.body.username,
            password: request.body.password
        };

        return await LoginAction.login(data);
    }

    private static async login(data: LoginData): Promise<object> {
        const isRoot: boolean = data.username == LoginAction.RootLogin.username && data.password == LoginAction.RootLogin.password;

        // Root login.
        if (isRoot)
            return { success: true, token: new Token({ payload: 'root', date: new Date(0) }, true).encoded };

        if (data.username == LoginAction.RootLogin.username)
            return { success: false, message: 'Login failed' };

        // Registered user login.
        let user: User;
        
        try {
          user = await User.login({ username: data.username, rawPassword: data.password });
        } catch(error) {
            let message = (error as Error).message;
            return { success: false, message };
        }

        return { succes: true, token: user.token };
    }
}

export { LoginRoute, LoginAction }
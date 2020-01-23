import Fastify from 'fastify';
import Mongoose from "mongoose";
import { ServerResponse, IncomingMessage } from 'http';
import { Route } from "../../../components/router/Route";
import { RouteModel } from "../../../components/router/RouteModel";
import { Router } from "../../../components/router/Router";

type LoginData = {
    username: string,
    password: string
};

class LoginRoute extends Route {

    constructor() {
        super();

        this.initialise(LoginRoute.route());
    }

    public static route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/login',
            auth: false,
            schema : { indexRoute: true },
            handler: this.process.bind(this)
        });
    }
}

class LoginAction extends Route {

    constructor() {
        super();

        this.initialise(LoginAction.route());
    }

    public static route(): RouteModel {
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

    public static async process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>) {
        await super.process(request, reply);

        const data: LoginData = {
            username: request.body.username,
            password: request.body.password
        };

        return { success: true, token: '' };
    }
}

export { LoginRoute, LoginAction }
/// <reference types="node" />
import Fastify from 'fastify';
import { ServerResponse, IncomingMessage } from 'http';
import { Route } from "../../../components/router/Route";
import { RouteModel } from "../../../components/router/RouteModel";
declare class LoginAction extends Route {
    private static RootLogin;
    constructor();
    get route(): RouteModel;
    process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>): Promise<object>;
    private static login;
}
export { LoginAction };

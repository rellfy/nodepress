/// <reference types="node" />
import Fastify from 'fastify';
import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { IPost } from "./PostModel";
import { ServerResponse, IncomingMessage } from 'http';
declare class PostRoute extends Route {
    constructor();
    static route(): RouteModel;
}
declare class PostPublish extends Route {
    constructor();
    static route(): RouteModel;
    static process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>): Promise<{
        success: boolean;
    }>;
    static createPost(post: IPost): Promise<void>;
}
export { PostRoute, PostPublish };

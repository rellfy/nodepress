/// <reference types="node" />
import Fastify from 'fastify';
import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { ServerResponse, IncomingMessage } from 'http';
import { IPostDocument } from '../post/PostModel';
declare class FetchRoute extends Route {
    get route(): RouteModel;
    process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>): Promise<IPostDocument | IPostDocument[]>;
    static fetchPost(query: any): Promise<IPostDocument>;
    static fetchPosts(from: number, to: number): Promise<IPostDocument[]>;
}
export { FetchRoute };

/// <reference types="node" />
import { RouteModel } from "./RouteModel";
import { Router } from "./Router";
import * as React from 'react';
import Fastify from 'fastify';
import { ServerResponse, IncomingMessage } from 'http';
declare class Route {
    protected router: Router;
    model: RouteModel;
    component: typeof React.Component;
    get Model(): RouteModel;
    set Router(value: Router);
    static parse(request: string): void;
    get Endpoint(): string;
    static route(): RouteModel;
    protected initialise(route: RouteModel): void;
    static getDescendantProp(object: any, stack: string): any;
    /**
     * Iterate through request object and throw an exception if it doesn't
     * match the schema for the route.
     * TODO: This should also be requested from the front-end when browsing via react router.
     */
    static iterate(request: any, object: any, stack?: string): void;
    static isAuthenticated(route: RouteModel, request: Fastify.FastifyRequest<IncomingMessage>): boolean;
    static process(request: any, reply: Fastify.FastifyReply<ServerResponse>, redirectUrl?: string): Promise<any>;
}
export { Route };

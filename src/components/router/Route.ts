import Boom from 'boom';
import fs from 'fs';
import path from 'path';

import { RouteModel } from "./RouteModel";
import { Router } from "./Router";
import { NetInterface } from "../network/interface/NetInterface";
import { Schema } from 'mongoose';
import * as React from 'react';
import cache from '../../Cache';
import { NodeBuilder } from '../../NodeBuilder';
import Fastify from 'fastify';
import { ServerResponse, IncomingMessage } from 'http';
import { Token } from '../../plugins/user/Token';
import CacheKeys from '../../CacheKeys';

/* 
{
    method: 'GET',
    url: '/',
    schema: {
        querystring: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
        },
        response: {
        200: {
            type: 'object',
            properties: {
            hello: { type: 'string' }
            }
        }
        }
    },
    handler: function (request, reply) {
        reply.send({ hello: 'world' })
    }
}
*/

abstract class Route {

	protected router!: Router;
	public component!: typeof React.Component;
	
	public set Router(value: Router) {
		this.router = value;
	}

	public get Endpoint(): string {
		return this.route.endpoint;
	} 

	public abstract get route(): RouteModel;

	private static getDescendantProp(object: any, stack: string) {
		let arr: any = stack.split('.');
		while (arr.length && (object = object[arr.shift()]));
		return object;
	}

	/**
	 * Iterate through request object and throw an exception if it doesn't
	 * match the schema for the route. 
	 * TODO: This should also be requested from the front-end when browsing via react router.
	 */
	public static iterate(request: any, object: any, stack?: string) {
		for (let key in object) {
			if (key == 'type')
				continue;

			if (typeof object[key] == 'object' && object[key].type == null) {
				Route.iterate(request, object[key], stack ? stack + '.' + key : key);
				continue;
			}

			const isRequestFieldNull = Route.getDescendantProp(request, stack ? stack + '.' + key : key) == null;
			const isSchemaFieldRequired = object[key].required;

			if (isSchemaFieldRequired && isRequestFieldNull)
				throw Boom.badRequest(`${key.charAt(0).toUpperCase() + key.substr(1)} must be valid`);
		}
	}

	public static isAuthenticated(route: RouteModel, request: Fastify.FastifyRequest<IncomingMessage>): boolean {
		let cookie: string = request.headers['cookie'];
		let authCookie: string = cookie?.replace('auth=', '');

		if (authCookie == null && !request.headers['auth'])
			return false;
		
		return Token.validate(authCookie == null ? request.headers['auth'] : authCookie);
	}

	public async process(request: any, reply: Fastify.FastifyReply<ServerResponse>, redirectUrl?: string) {
		// Check authentication
		const isAuthenticated: boolean = Route.isAuthenticated(this.route, request);

		if (this.route.auth == true && !isAuthenticated) {
			// redirectUrl here is 'unauthorized redirect url', e.g. from post page to login.
			if (!redirectUrl)
				throw Boom.unauthorized();
			
			reply.redirect(redirectUrl);
			return;
		}

		if (this.route.auth == false && isAuthenticated && redirectUrl) {
			// redirectUrl here is 'authorised redirect url', e.g. from login page to index.
			reply.redirect(redirectUrl);
			return;
		}

		const schemaNullOrEmpty = this.route.schema == null || Object.keys(this.route.schema).length < 1;

		if (!schemaNullOrEmpty && this.route.schema.indexRoute) {
			// Send index react-router route.
			reply.header('Content-Type', 'text/html');
			return cache.get(CacheKeys.ROUTER_INDEX_SRC);
		}

		if (request == null || (request.body == null && !schemaNullOrEmpty))
			throw Boom.badRequest();

		Route.iterate(request, this.route.schema);
	}
}

export { Route };
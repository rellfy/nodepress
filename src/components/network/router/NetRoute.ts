import Boom from 'boom';

import { RouteModel } from "./RouteModel";
import { Router } from "./Router";
import { NetInterface } from "../interface/NetInterface";
import { Schema } from 'mongoose';

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

class Route {

	protected router!: Router;
	public model!: RouteModel;
	
	public get Model(): RouteModel {
		return this.model || 'empty model';
    }
    
    public set Router(value: Router) {
        this.router = value;
    }

	static parse(request: string) {
		try {
			JSON.parse(request);
		} catch(e) {
			throw e;
		}
	}

    public get Endpoint(): string {
		return this.model.endpoint;
    } 

	constructor() { }
	
	protected route(): RouteModel {
		return new RouteModel({
			method: 'GET',
			endpoint: '/',
			schema: { },
			handler: this.process.bind(this)
		});
	}
	
	protected initialise(route: RouteModel) {
		this.model = route;
	}

	static getDescendantProp(object: any, stack: string) {
		let arr: any = stack.split('.');
		while (arr.length && (object = object[arr.shift()]));
		return object;
	}

	/**
	 * Iterate through request object and throw an exception if it doesn't
	 * match the schema for the route
	 */
	static iterate(request: any, object: any, stack?: string) {
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

	static isAuthenticated(route: RouteModel, request: any): boolean {
		/*
			handle authentication here
		*/
		console.log('should be handling request authentication');
		return false;
	}

    public async process(request: any, reply: any) {
		// Check authentication
		if (this.route().auth == true && !Route.isAuthenticated(this.route(), request))
			throw Boom.unauthorized();
		
		const schemaNullOrEmpty = this.route().schema == null || Object.keys(this.route().schema).length < 1;

		if (request == null || (request.body == null && !schemaNullOrEmpty))
			throw Boom.badRequest();

		Route.iterate(request, this.route().schema);
	}
}

export { Route };
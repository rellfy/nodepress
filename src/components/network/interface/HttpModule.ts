import Fastify, { FastifyInstance, FastifyReply } from 'fastify';
import qs from "qs";
import Boom from 'boom';

import { NetInterfaceModule } from './NetInterfaceModule';
import { RouteModel } from '../router/RouteModel';
import fs from 'fs';

class HttpModule extends NetInterfaceModule {

    protected server!: FastifyInstance;
    
    private ssl!: { cert: string, key: string };

    constructor(https: { cert: string, key: string }) {
        super();
        
        this.server = Fastify(this.getServerConfig(https));
    }

    private getServerConfig(https: { cert: string, key: string }): object {
        return {
            https: !process.argv.includes('--dev') ? {
                cert: https.cert ? fs.readFileSync(https.cert) : null,
                key: https.key ? fs.readFileSync(https.key) : null
            } : null,
            querystringParser: (str: string) => qs.parse(str),
            trustProxy: true,
            ignoreTrailingSlash: true
        }
    }
    
    public route(model: RouteModel) {
        super.route(model);
        
        this.server.route({
            method: model.method,
            url: model.endpoint,
            schema: model.schema,
            handler: async (request, reply) => {
                try {
                    await model.handler(request, reply);
                } catch(e) {
                    let error: Boom;

                    if (!e.isBoom) {
                        error = Boom.internal('Internal server error');
                        console.log(`There was an internal error in the route ${model.method}`, e);
                    } else {
                        error = e;
                    }

                    reply.status(error.output.statusCode).send(error.output.payload);
                }
            }
        });
    }
    
    public async initialise(port: number) {
        this.port = port;
        
        this.server.register(require('fastify-formbody'))
        
        return new Promise((resolve, reject) => {
            this.server.listen(this.port, '0.0.0.0', (error) => {
                if (error)
                    reject(error);
                    
                console.log(`initialised http server at port ${port}`);
                resolve();
            });
        });
    }
}

export { HttpModule };
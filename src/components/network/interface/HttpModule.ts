import Fastify, { FastifyInstance, FastifyReply } from 'fastify';
import qs from "qs";
import path from "path";
import Boom from 'boom';

import { NetInterfaceModule } from './NetInterfaceModule';
import { RouteModel } from '../../router/RouteModel';
import fs from 'fs';
import cache from '../../../Cache';

class HttpModule extends NetInterfaceModule {

    protected server!: FastifyInstance;
    
    private ssl!: { cert: string, key: string };

    public get Server(): FastifyInstance {
        return this.server;
    }

    constructor(https: { cert: string, key: string }) {
        super();
        
        this.server = Fastify(this.getServerConfig(https));
        this.server.register(require('fastify-static'), {
            root: path.resolve(cache.get('root_path'), 'public/'),
            prefix: '/public-np/'
        });
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
                    let handler = await model.handler(request, reply);
                    let contentType = reply.getHeader('Content-Type') ?
                        reply.getHeader('Content-Type') :
                        'application/json';
                        
                    if (handler != null)
                        reply.status(200)
                             .header('Content-Type',  contentType)
                             .send(handler);
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
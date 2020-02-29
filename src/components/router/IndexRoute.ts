import Fastify from 'fastify';
import { RouteModel } from "./RouteModel";
import { ServerResponse, IncomingMessage } from 'http';
import { Route } from './Route';

class IndexRoute extends Route {

	private endpoint: string;
	private auth: boolean;
	private authRedirect?: string;

	public constructor(endpoint: string, auth: boolean = false, authRedirect?: string) {
		super();

		this.endpoint = endpoint;
		this.auth = auth;
		this.authRedirect = authRedirect;
	}

    public get route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: this.endpoint,
            auth: this.auth,
            schema : { indexRoute: true },
            handler: (request: Fastify.FastifyRequest<IncomingMessage>, response: Fastify.FastifyReply<ServerResponse>) => {
				return this.process(request, response, this.authRedirect);
			}
        });
    }
}

export { IndexRoute };
import { FastifyInstance } from 'fastify';
import { NetInterfaceModule } from './NetInterfaceModule';
import { RouteModel } from '../../router/RouteModel';
import { StaticFolder } from './NetInterface';
declare class HttpModule extends NetInterfaceModule {
    protected server: FastifyInstance;
    private ssl;
    get Server(): FastifyInstance;
    constructor(https: {
        cert: string;
        key: string;
    }, folders: StaticFolder[]);
    private getServerConfig;
    route(model: RouteModel): void;
    initialise(port: number): Promise<unknown>;
}
export { HttpModule };

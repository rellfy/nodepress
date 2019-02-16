import { NetInterface, NetInterfaceConfig } from "./interface/NetInterface";
import { EventEmitter } from "events";
import { Router, RouterConfig } from "./router/Router";
import { Server } from "../../Server";

class Network extends EventEmitter {

    private interface: NetInterface;
    private router: Router;
    private server: Server;

    constructor(config: NetConfig, server: Server) {
        super();
        
        this.server = server;
        this.interface = new NetInterface(config.interface);
        this.router = new Router();
    }
    
    /**
     * 
     * @param config Network configuration object
     */
    async listen(config: any) {
        await this.router.initialise(config.router);
        this.router.handle(this.interface);
        
        await this.interface.initialise(config.interface);
    }

    /**
     * Passes the request from the NetInterface to the Router module
     * @param endpoint The endpoint path
     * @param request  The request object
     */
    // private async handleRequest(endpoint: string, request: any) {
    //     console.log(`handling request on endpoint ${endpoint}`);
    //     const response = await this.router.handle(endpoint, request);
    //     console.log(`response`, response);
    // }
}

export interface NetConfig {
    interface: NetInterfaceConfig;
    router: RouterConfig;
}

export { Network };
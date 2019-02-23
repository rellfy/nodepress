import { NetInterface, NetInterfaceConfig } from "./interface/NetInterface";
import { EventEmitter } from "events";
import { Router, RouterConfig } from "../router/Router";
import { NodePress } from "../../NodePress";

class Network extends EventEmitter {

    private interface: NetInterface;
    private router: Router;
    private server: NodePress;

    constructor(config: NetConfig, server: NodePress) {
        super();
        
        this.server = server;
        this.interface = new NetInterface(config.interface);
        this.router = new Router(this.server.PluginManager);
    }
    
    /**
     * 
     * @param config Network configuration object
     */
    async listen(config: any) {
        await this.router.initialise();
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
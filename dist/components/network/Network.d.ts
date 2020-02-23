/// <reference types="node" />
import { NetInterface, NetInterfaceConfig } from "./interface/NetInterface";
import { EventEmitter } from "events";
import { RouterConfig } from "../router/Router";
import { NodePress } from "../../NodePress";
declare class Network extends EventEmitter {
    private interface;
    private router;
    private server;
    get Interface(): NetInterface;
    constructor(config: NetConfig, server: NodePress);
    /**
     *
     * @param config Network configuration object
     */
    listen(config: any): Promise<void>;
}
export interface NetConfig {
    interface: NetInterfaceConfig;
    router: RouterConfig;
}
export { Network };

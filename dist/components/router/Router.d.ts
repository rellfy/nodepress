/// <reference types="node" />
import { EventEmitter } from "events";
import { NetInterface } from "../network/interface/NetInterface";
import { PluginManager } from "../plugins/PluginManager";
import { Network } from "../network/Network";
export interface RouterConfig {
    path: string;
}
/**
 * The Router class processes requests coming from NetInterface instances
 */
declare class Router extends EventEmitter {
    private network;
    private routes;
    private pluginManager;
    get Network(): Network;
    get PluginManager(): PluginManager;
    constructor(network: Network, pluginManager: PluginManager);
    initialise(): Promise<void>;
    /**
     * Initial endpoint handler for NetInterface types integrating with
     * the Router.
     * @param endpoint The request endpoint
     * @param request The request object
     * @param reply The reply object
     */
    handle(netInterface: NetInterface): void;
    private static getFilesRecursively;
    /**
     * Retrieve routes from path
     * @param routePath The path where routes are exported
     */
    private getRoutes;
    private getRoutesFromFiles;
    private getRoute;
    private compileIndexPage;
}
export { Router };

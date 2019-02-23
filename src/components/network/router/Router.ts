import { EventEmitter } from "events";
import path from "path";
import fs from "fs";

import { Route } from "./Route";
import { NetInterfaceModule } from "../interface/NetInterfaceModule";
import { NetInterface } from "../interface/NetInterface";
import { PluginManager } from "../../plugins/PluginManager";

export interface RouterConfig {
    path: string
}

/**
 * The Router class processes requests coming from NetInterface instances
 */
class Router extends EventEmitter {

    private routes: Route[] = [];
    private pluginManager: PluginManager;

    constructor(pluginManager: PluginManager) {
        super();

        this.pluginManager = pluginManager;
    }

    public async initialise() {
        await this.getRoutes(path.resolve(__dirname, 'routes/'));
    }

    /**
     * Initial endpoint handler for NetInterface types integrating with
     * the Router.
     * @param endpoint The request endpoint 
     * @param request The request object
     * @param reply The reply object
     */
    public handle(netInterface: NetInterface) {
        const http: NetInterfaceModule = netInterface.get('http');
        // const udp: NetInterfaceModule = netInterface.get('udp')
        
        for (let i = 0; i < this.routes.length; i++) {
            http.route(this.routes[i].model);
        }
    }

    private static async getFilesRecursively(directory: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let results: string[] = [];
            
            fs.readdir(directory, (error: any, directoryFiles: string[]) => {
                if (error) {
                    reject(error);
                    return;
                }

                let i = 0;

                const next = () => {
                    let file = directoryFiles[i++];

                    if (file == null)  {
                        resolve(results);
                        return;
                    }

                    file = path.join(directory, file);

                    fs.stat(file, async (error: any, stat: fs.Stats) => {
                        if (!stat || !stat.isDirectory()) {
                            results.push(file);
                            next();
                            return;
                        }
                        
                        let nextResults = await Router.getFilesRecursively(file);
                        results = results.concat(nextResults);
                        next();
                    });
                };

                next();
            });
        });
    }
    
    /**
     * Retrieve routes from path
     * @param routePath The path where routes are exportes
     */
    private async getRoutes(input?: string): Promise<void> {
        let routes: typeof Route[] = [];

        // Get routes
        if (input != null && input.length > 0) {
            routes = await this.getRoutesFromFiles(input);
        } else {
            this.pluginManager.Plugins.forEach((plugin) => {
                routes.concat(plugin.route());
            });
        }

        // Register routes
        routes.forEach((PluginRoute: typeof Route) => {
            const route = new PluginRoute();
            route.Router = this;
            
            this.routes.push(route);
        });
    }

    private async getRoutesFromFiles(routePath: string): Promise<typeof Route[]> {
        const absolutePath = path.join(__dirname, routePath)
        const files = await Router.getFilesRecursively(absolutePath);
        const routes: typeof Route[] = [];

        files.forEach((file) => {
            let Route = require(path.resolve(absolutePath, file)).Route;
            
            if (Route == null)
                return;

            routes.push(Route);
        });

        return routes;
    }

    private getRoute(endpoint: string): Route {
        for (let i = 0; i < this.routes.length; i++) {
            if (this.routes[i].Endpoint == endpoint)
            return this.routes[i];
        }
        
        throw new Error(`route "${path}" not found`);
    }
}

export { Router };
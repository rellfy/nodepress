import { EventEmitter } from "events";
import path from "path";
import fs from "fs";
import util from "util";

import { Route } from "./Route";
import { NetInterfaceModule } from "../network/interface/NetInterfaceModule";
import { NetInterface } from "../network/interface/NetInterface";
import { PluginManager } from "../plugins/PluginManager";
import * as React from "react";
import { Route as DOMRoute } from "react-router-dom";
import { Network } from "../network/Network";

export interface RouterConfig {
    path: string
}

/**
 * The Router class processes requests coming from NetInterface instances
 */
class Router extends EventEmitter {

    private network: Network;
    private routes: Route[] = [];
    private pluginManager: PluginManager;

    public get Network(): Network {
        return this.Network;
    }

    public get PluginManager(): PluginManager {
        return this.pluginManager;
    }

    constructor(network: Network, pluginManager: PluginManager) {
        super();

        this.network = network;
        this.pluginManager = pluginManager;
    }

    public async initialise() {
        await this.getRoutes();
        await this.compileIndexPage();
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
            // Retrieve from path
            routes = await this.getRoutesFromFiles(input);
        } else {
            // Retrieve from registered plugins (default)
            this.pluginManager.Plugins.forEach((plugin) => {
                routes = routes.concat(plugin.route().server);
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

    private async compileIndexPage(): Promise<void> {
        // make /public dir if needed
        /* 
            <Router history={history}>
                <Switch>
                    { plugin routes here }
                </Switch>
            </Router>

            => transpile this into js, save into /public/main.np.js
        */


    }
}

class Test extends React.Component {
	render() {
		return <div>test</div>
	}
}

export { Router };
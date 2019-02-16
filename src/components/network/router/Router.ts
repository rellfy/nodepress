import { EventEmitter } from "events";
import path from "path";
import fs from "fs";

import { Route } from "./NetRoute";
import { NetInterfaceModule } from "../interface/NetInterfaceModule";
import { NetInterface } from "../interface/NetInterface";

export interface RouterConfig {
    path: string
}

/**
 * The Router class processes requests coming from NetInterface instances
 */
class Router extends EventEmitter {

    private routes: Route[] = [];

    constructor() {
        super();
    }

    public async initialise(config: RouterConfig) {
        await this.getRoutes(config.path);
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
    private async getRoutes(routePath: string): Promise<void> {
        console.log(`retrieving API routes from route directory`);
        
        const absolutePath = path.join(__dirname, routePath)
        const files = await Router.getFilesRecursively(absolutePath);

        files.forEach((file) => {
            let Route = require(path.resolve(absolutePath, file)).Route;
            
            if (Route == null)
                return;

            const route = new Route();
            route.Router = this;
            
            this.routes.push(route);
        });
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
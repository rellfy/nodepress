import { Route } from "../router/Route";
interface PluginRoute {
    server: new () => Route;
    client?: string;
}
declare class Plugin {
    constructor();
    static load(path: string): void;
    routes(): PluginRoute[];
}
export { Plugin, PluginRoute };

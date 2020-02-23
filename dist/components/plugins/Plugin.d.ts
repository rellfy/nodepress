import { Route } from "../router/Route";
interface IPluginRoute {
    server: typeof Route;
    client?: string;
}
declare class Plugin {
    constructor();
    static load(path: string): void;
    routes(): IPluginRoute[];
}
export { Plugin, IPluginRoute };

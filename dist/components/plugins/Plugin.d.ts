import { Route } from "../router/Route";
interface PluginRoute {
    server: Route;
    client?: string;
}
declare abstract class Plugin {
    abstract routes: PluginRoute[];
}
export { Plugin, PluginRoute };

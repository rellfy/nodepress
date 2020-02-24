import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles post retrieval.
 */
declare class Fetch extends Plugin {
    constructor();
    routes(): PluginRoute[];
}
export default Fetch;

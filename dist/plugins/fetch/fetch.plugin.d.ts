import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles post retrieval.
 */
declare class Fetch extends Plugin {
    constructor();
    routes(): IPluginRoute[];
}
export default Fetch;

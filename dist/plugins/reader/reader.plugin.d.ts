import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles the individual viewing of posts.
 */
declare class Reader extends Plugin {
    constructor();
    routes(): IPluginRoute[];
}
export default Reader;

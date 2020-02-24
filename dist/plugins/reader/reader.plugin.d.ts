import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles the individual viewing of posts.
 */
declare class Reader extends Plugin {
    constructor();
    routes(): PluginRoute[];
}
export default Reader;

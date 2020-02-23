import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles the feed/index page.
 */
declare class Feed extends Plugin {
    constructor();
    routes(): IPluginRoute[];
}
export default Feed;

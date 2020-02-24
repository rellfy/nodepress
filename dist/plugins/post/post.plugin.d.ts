import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles the post process and publishing page.
 */
declare class Post extends Plugin {
    constructor();
    routes(): PluginRoute[];
}
export default Post;

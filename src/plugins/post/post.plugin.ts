import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import { PostRoute, PostPublish } from "./PostRoute";
import path from "path";

/**
 * This core plugin handles the post process and publishing page.
 */
class Post extends Plugin {

    constructor() {
        super();
    }

    public routes(): PluginRoute[] {
        return [{
            server: PostRoute,
            client: path.resolve(__dirname, 'PostComponent')
        }, {
            server: PostPublish
        }];
    }
}

export default Post;
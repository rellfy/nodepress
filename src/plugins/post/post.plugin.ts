import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import { PostPublish } from "./PostRoute";
import path from "path";
import { IndexRoute } from "../../components/router/IndexRoute";

/**
 * This core plugin handles the post process and publishing page.
 */
class Post extends Plugin {

    public routes: PluginRoute[] = [{
        server: new IndexRoute('/post', true, '/login?to=/post'),
        client: path.resolve(__dirname, 'PostComponent')
    }, {
        server: new PostPublish()
    }];
}

export default Post;
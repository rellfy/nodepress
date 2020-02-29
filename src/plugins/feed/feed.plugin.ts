import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import path from "path";
import { IndexRoute } from "../../components/router/IndexRoute";

/**
 * This core plugin handles the feed/index page.
 */
class Feed extends Plugin {

    public routes: PluginRoute[] = [{
        server: new IndexRoute('/'),
        client: path.resolve(__dirname, 'FeedComponent')
    }];;
}

export default Feed;
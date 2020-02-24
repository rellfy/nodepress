import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import path from "path";
import { FeedRoute } from "./FeedRoute";

/**
 * This core plugin handles the feed/index page.
 */
class Feed extends Plugin {

    constructor() {
        super();
    }

    public routes(): PluginRoute[] {
        return [{
            server: FeedRoute,
            client: path.resolve(__dirname, 'FeedComponent')
        }];
    }
}

export default Feed;
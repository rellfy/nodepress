import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
import path from "path";
import { FeedRoute } from "./FeedRoute";

/**
 * This core plugin handles the feed/index page.
 */
class Feed extends Plugin {

    constructor() {
        super();
    }

    public routes(): IPluginRoute[] {
        return [{
            server: FeedRoute,
            client: path.resolve(__dirname, 'FeedComponent')
        }];
    }
}

export default Feed;
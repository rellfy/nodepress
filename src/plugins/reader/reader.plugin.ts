import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import path from "path";
import { IndexRoute } from "../../components/router/IndexRoute";

/**
 * This core plugin handles the individual viewing of posts.
 */
class Reader extends Plugin {

    public routes: PluginRoute[] = [{
        server: new IndexRoute('/read/:post'),
        client: path.resolve(__dirname, 'ReaderComponent')
    }];
}

export default Reader;
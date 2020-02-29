import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import { FetchRoute } from "./FetchRoute";
import path from "path";

/**
 * This core plugin handles post retrieval.
 */
class Fetch extends Plugin {

    public routes: PluginRoute[] = [{
        server: new FetchRoute()
    }];
}

export default Fetch;
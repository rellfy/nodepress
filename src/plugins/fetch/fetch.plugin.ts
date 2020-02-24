import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import { FetchRoute } from "./FetchRoute";
import path from "path";

/**
 * This core plugin handles post retrieval.
 */
class Fetch extends Plugin {

    constructor() {
        super();
    }

    public routes(): PluginRoute[] {
        return [{
            server: FetchRoute
        }];
    }
}

export default Fetch;
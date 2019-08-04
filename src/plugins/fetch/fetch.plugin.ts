import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
import { FetchRoute } from "./FetchRoute";
import path from "path";

/**
 * This core plugin handles post retrieval.
 */
class Fetch extends Plugin {

    constructor() {
        super();
    }

    public routes(): IPluginRoute[] {
        return [{
            server: FetchRoute
        }];
    }
}

export default Fetch;
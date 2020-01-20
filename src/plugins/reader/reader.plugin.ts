import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
import { ReaderRoute } from "./ReaderRoute";
import path from "path";

/**
 * This core plugin handles the individual viewing of posts.
 */
class Reader extends Plugin {

    constructor() {
        super();
    }

    public routes(): IPluginRoute[] {
        return [{
            server: ReaderRoute,
            client: path.resolve(__dirname, 'ReaderComponent')
        }]
    }
}

export default Reader;
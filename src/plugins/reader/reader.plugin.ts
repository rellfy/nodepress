import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
import { ReaderRoute } from "./ReaderRoute";
import path from "path";

/**
 * This core plugin handles the post process and post page.
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
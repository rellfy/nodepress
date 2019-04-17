import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
import { PostRoute } from "./PostRoute";
import path from "path";

class Post extends Plugin {

    constructor() {
        super();
    }

    public routes(): IPluginRoute[] {
        return [{
            server: PostRoute,
            client: path.resolve(__dirname, 'PostComponent')
        }];
    }
}

export default Post;
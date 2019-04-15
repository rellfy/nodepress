import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
import { Router } from "../../components/router/Router";
import { RouteModel } from "../../components/router/RouteModel";
import { Route } from "../../components/router/Route";
import { PostRoute, PostRoute2 } from "./PostRoute";
import path from "path";

class Post extends Plugin {

    constructor() {
        super();
    }

    public routes(): IPluginRoute[] {
        return [{
            server: PostRoute,
            client: path.resolve(__dirname, 'PostComponent')
        }, {
            server: PostRoute2,
            client: path.resolve(__dirname, 'PostComponent')
        }];
    }
}

export default Post;
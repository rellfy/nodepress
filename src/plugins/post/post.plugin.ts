import { Plugin } from "../../components/plugins/Plugin";
import { Router } from "../../components/router/Router";
import { RouteModel } from "../../components/router/RouteModel";
import { Route } from "../../components/router/Route";
import { PostRoute, PostRoute2 } from "./PostRoute";
import { PostRouteComponent } from "./PostComponent";

class Post extends Plugin {

    constructor() {
        super();
    }

    route() {
        return {
            server: [PostRoute, PostRoute2],
            client: PostRouteComponent
        };
    }
}

export default Post;
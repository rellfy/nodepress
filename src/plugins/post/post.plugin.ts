import { Plugin } from "../../components/plugins/Plugin";
import { Router } from "../../components/router/Router";
import { RouteModel } from "../../components/router/RouteModel";
import { Route } from "../../components/router/Route";
import { PostRoute } from "./PostRoute";
import { PostComponent } from "./PostComponent";

class Post extends Plugin {

    constructor() {
        super();
    }

    route() {
        return {
            server: PostRoute,
            client: PostComponent
        };
    }
}

export default Post;
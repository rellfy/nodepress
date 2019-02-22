import { Plugin } from "../components/plugins/Plugin";
import { Router } from "../components/network/router/Router";
import { RouteModel } from "../components/network/router/RouteModel";
import { Route } from "../components/network/router/NetRoute";
import { PostPanel } from "./post/postpanel";

class Post extends Plugin {

    constructor() {
        super();
    }

    route(): typeof Route {
        return PostPanel;
    }

    /*
    todo - frontend customisation (integrated w/ react)
    render(): React.Element<any> {
    } */
}

export default Post;
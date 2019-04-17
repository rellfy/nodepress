import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { Router } from "../../components/router/Router";

class PostRoute extends Route {

    constructor() {
        super();

        this.initialise(PostRoute.route());
    }

    public static route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/post',
            // auth: true,
            schema : null,
            handler: this.process.bind(this)
        });
    }
}

export { PostRoute }
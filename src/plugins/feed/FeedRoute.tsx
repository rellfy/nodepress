import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";

class FeedTagRoute extends Route {

    public get route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/tag/:tag',
            auth: false,
            schema : { indexRoute: true },
            handler: this.process.bind(this)
        });
    }
}

export { FeedTagRoute }
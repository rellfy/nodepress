import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
declare class FeedRoute extends Route {
    constructor();
    static route(): RouteModel;
}
declare class FeedTagRoute extends Route {
    constructor();
    static route(): RouteModel;
}
export { FeedRoute, FeedTagRoute };

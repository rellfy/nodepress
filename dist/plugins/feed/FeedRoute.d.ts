import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
declare class FeedRoute extends Route {
    get route(): RouteModel;
}
declare class FeedTagRoute extends Route {
    get route(): RouteModel;
}
export { FeedRoute, FeedTagRoute };

import { RouteModel } from "./RouteModel";
import { Route } from './Route';
declare class IndexRoute extends Route {
    private endpoint;
    private auth;
    private authRedirect?;
    constructor(endpoint: string, auth?: boolean, authRedirect?: string);
    get route(): RouteModel;
}
export { IndexRoute };

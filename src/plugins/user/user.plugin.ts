import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import { LoginRoute, LoginAction } from "./login/LoginRoute";
import path from "path";

/**
 * This core plugin handles resources related to any user, including root.
 */
class User extends Plugin {

    constructor() {
        super();
    }

    public routes(): PluginRoute[] {
        return [{
            server: LoginRoute,
            client: path.resolve(__dirname, 'login/LoginComponent')
        }, {
            server: LoginAction
        }];
    }
}

export default User;
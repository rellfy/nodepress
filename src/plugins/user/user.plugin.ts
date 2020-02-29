import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
import { LoginAction } from "./login/LoginRoute";
import path from "path";
import { IndexRoute } from "../../components/router/IndexRoute";

/**
 * This core plugin handles resources related to any user, including root.
 */
class User extends Plugin {

    public routes: PluginRoute[] = [{
        server: new IndexRoute('/login'),
        client: path.resolve(__dirname, 'login/LoginComponent')
    }, {
        server: new LoginAction()
    }];
}

export default User;
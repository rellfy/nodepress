import { Plugin, PluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles resources related to any user, including root.
 */
declare class User extends Plugin {
    routes: PluginRoute[];
}
export default User;

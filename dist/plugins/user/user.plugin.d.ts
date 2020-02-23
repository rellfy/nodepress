import { Plugin, IPluginRoute } from "../../components/plugins/Plugin";
/**
 * This core plugin handles resources related to any user, including root.
 */
declare class User extends Plugin {
    constructor();
    routes(): IPluginRoute[];
}
export default User;

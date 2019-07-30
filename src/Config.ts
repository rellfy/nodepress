import { NetConfig } from "./components/network/Network";
import { UserConfig } from "./components/user/User";
import { DbConfig } from "./components/database/Database";

export interface Config {
    net: NetConfig;
    user: UserConfig;
    db: DbConfig;
}
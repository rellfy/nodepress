import { NetConfig } from "./components/network/Network";
import { DbConfig } from "./components/database/Database";
import { UserConfig } from "./plugins/user/User";

export interface Config {
    net: NetConfig;
    user: UserConfig;
    db: DbConfig;
    api: ApiConfig;
}

export interface ApiConfig {
    np_epoch: number;
}
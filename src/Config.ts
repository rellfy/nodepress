import { NetConfig } from "./components/network/Network";
import { DbConfig } from "./components/database/Database";
import { UserConfig } from "./plugins/user/User";

export interface Arguments {
    plugins: Plugin[];
    dev?: boolean;
    configPath?: string;
    ignoreCorePlugins?: boolean;
}

export interface Config {
    args: Arguments;
    net: NetConfig;
    user: UserConfig;
    db: DbConfig;
    api: ApiConfig;
}

export interface ApiConfig {
    np_epoch: number;
}
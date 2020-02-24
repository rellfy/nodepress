import { NetConfig } from "./components/network/Network";
import { DbConfig } from "./components/database/Database";
import { UserConfig } from "./plugins/user/User";
import { Plugin } from "./components/plugins/Plugin";

export interface Arguments {
    config: string;
    layout: {
        head: string;
        body: string;
    };
    plugins: typeof Plugin[];
    ignoreCorePlugins?: boolean;
    dev?: boolean;
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
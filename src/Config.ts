import { NetConfig } from "./components/network/Network";
import { UserConfig } from "./components/user/User";

export interface Config {
    net: NetConfig;
    user: UserConfig;
}
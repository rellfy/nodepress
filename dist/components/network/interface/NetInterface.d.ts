import { NetInterfaceModule } from './NetInterfaceModule';
import { HttpModule } from './HttpModule';
export interface StaticFolder {
    path: string;
    prefix: string;
}
export interface NetInterfaceConfig {
    static: StaticFolder[] | null;
    ports: {
        https: number;
        udp: number;
    };
    https: {
        cert: string;
        key: string;
    };
}
declare class NetInterface {
    private httpModule;
    get HttpModule(): HttpModule;
    constructor(config: NetInterfaceConfig);
    initialise(config: NetInterfaceConfig): Promise<void>;
    get(type: string): NetInterfaceModule;
}
export { NetInterface };

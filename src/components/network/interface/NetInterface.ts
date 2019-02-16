import EventEmitter from 'events';

import { NetInterfaceModule } from './NetInterfaceModule';
import { HttpModule } from './HttpModule';

export interface NetInterfaceConfig {
    ports: {
        https: number,
        udp: number
    }
    https: {
        cert: string,
        key: string
    }
}

class NetInterface {

    private httpModule: HttpModule;

    constructor(config: NetInterfaceConfig) {
        this.httpModule = new HttpModule(config.https);
    }
    
    public async initialise(config: NetInterfaceConfig) {
        // await this.udpModule.initialise(config.ports.udp);
        await this.httpModule.initialise(config.ports.https);
        console.log(`initialised network interface`);
    }
    
    public get(type: string): NetInterfaceModule {
        switch (type.toLowerCase()) {
            case 'http':
                return this.httpModule;
            default:
                throw new Error(`Tried to get inexistent NetInterface "${type}", valid types are: "https"`);
        }
    }

    /* public request(module: string, request: any) {
        this.get(module).request(request.client, request.data);
    } */
}   

export { NetInterface };
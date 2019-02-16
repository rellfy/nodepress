import { RouteModel } from "../router/RouteModel";

class NetInterfaceModule {

    protected port!: number;
    protected server: any;

    constructor(opts?: any) {
        // this.request(new NetClient(), { id: 'a', a: 2 })
    }
 
    public async initialise(port: number) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    public route(model: RouteModel) {
        //console.log(`adding route ${model.endpoint}`);
    }
    
    public async request(client: any, data: object) { }
}

export { NetInterfaceModule };
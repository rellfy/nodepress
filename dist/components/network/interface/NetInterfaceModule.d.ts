import { RouteModel } from "../../router/RouteModel";
declare class NetInterfaceModule {
    protected port: number;
    protected server: any;
    constructor(opts?: any);
    initialise(port: number): Promise<unknown>;
    route(model: RouteModel): void;
    request(client: any, data: object): Promise<void>;
}
export { NetInterfaceModule };

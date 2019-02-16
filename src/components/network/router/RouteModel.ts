
/**
 * The RouteModel defines the properties of a NetRoute
 */
class RouteModel {

    public method: "DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT";
    public endpoint: string;
    public auth: boolean;
    public schema: any;
    public handler: Function;

    constructor(model: { method: "DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT", endpoint: string, auth?: any, schema: any, handler: Function }) {
        this.method = model.method;
        this.endpoint = model.endpoint;
        this.auth = model.auth ? true : false;
        this.schema = model.schema;
        this.handler = model.handler;
    }

}

export { RouteModel };
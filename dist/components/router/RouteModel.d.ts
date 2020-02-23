declare type HTTPMethod = "DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT";
/**
 * The RouteModel defines the properties of a NetRoute
 */
declare class RouteModel {
    method: HTTPMethod;
    endpoint: string;
    auth: boolean;
    /**
     * Whether to render this route only if the current path matches the route's endpoint exactly.
     */
    exactPath: boolean;
    schema: any;
    handler: Function;
    constructor(model: {
        method: HTTPMethod;
        endpoint: string;
        auth?: boolean;
        schema: any;
        handler: Function;
    });
}
export { RouteModel, HTTPMethod };

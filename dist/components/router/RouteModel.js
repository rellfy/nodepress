"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The RouteModel defines the properties of a NetRoute
 */
var RouteModel = /** @class */ (function () {
    function RouteModel(model) {
        /**
         * Whether to render this route only if the current path matches the route's endpoint exactly.
         */
        this.exactPath = true;
        this.method = model.method;
        this.endpoint = model.endpoint;
        this.auth = model.auth ? true : false;
        this.schema = model.schema;
        this.handler = model.handler;
    }
    return RouteModel;
}());
exports.RouteModel = RouteModel;
//# sourceMappingURL=RouteModel.js.map
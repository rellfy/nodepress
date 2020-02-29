"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RouteModel_1 = require("./RouteModel");
var Route_1 = require("./Route");
var IndexRoute = /** @class */ (function (_super) {
    __extends(IndexRoute, _super);
    function IndexRoute(endpoint, auth, authRedirect) {
        if (auth === void 0) { auth = false; }
        var _this = _super.call(this) || this;
        _this.endpoint = endpoint;
        _this.auth = auth;
        _this.authRedirect = authRedirect;
        return _this;
    }
    Object.defineProperty(IndexRoute.prototype, "route", {
        get: function () {
            var _this = this;
            return new RouteModel_1.RouteModel({
                method: 'GET',
                endpoint: this.endpoint,
                auth: this.auth,
                schema: { indexRoute: true },
                handler: function (request, response) {
                    return _this.process(request, response, _this.authRedirect);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    return IndexRoute;
}(Route_1.Route));
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=IndexRoute.js.map
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
var Route_1 = require("../../components/router/Route");
var RouteModel_1 = require("../../components/router/RouteModel");
var ReaderRoute = /** @class */ (function (_super) {
    __extends(ReaderRoute, _super);
    function ReaderRoute() {
        var _this = _super.call(this) || this;
        _this.initialise(ReaderRoute.route());
        return _this;
    }
    ReaderRoute.route = function () {
        return new RouteModel_1.RouteModel({
            method: 'GET',
            endpoint: '/read/:post',
            // auth: true,
            schema: { indexRoute: true },
            handler: this.process.bind(this)
        });
    };
    return ReaderRoute;
}(Route_1.Route));
exports.ReaderRoute = ReaderRoute;
//# sourceMappingURL=ReaderRoute.js.map
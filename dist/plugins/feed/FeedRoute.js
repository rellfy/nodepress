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
var FeedRoute = /** @class */ (function (_super) {
    __extends(FeedRoute, _super);
    function FeedRoute() {
        var _this = _super.call(this) || this;
        _this.initialise(FeedRoute.route());
        return _this;
    }
    FeedRoute.route = function () {
        return new RouteModel_1.RouteModel({
            method: 'GET',
            endpoint: '/',
            // auth: true,
            schema: { indexRoute: true },
            handler: this.process.bind(this)
        });
    };
    return FeedRoute;
}(Route_1.Route));
exports.FeedRoute = FeedRoute;
var FeedTagRoute = /** @class */ (function (_super) {
    __extends(FeedTagRoute, _super);
    function FeedTagRoute() {
        var _this = _super.call(this) || this;
        _this.initialise(FeedRoute.route());
        return _this;
    }
    FeedTagRoute.route = function () {
        return new RouteModel_1.RouteModel({
            method: 'GET',
            endpoint: '/tag/',
            // auth: true,
            schema: { indexRoute: true },
            handler: this.process.bind(this)
        });
    };
    return FeedTagRoute;
}(Route_1.Route));
exports.FeedTagRoute = FeedTagRoute;
//# sourceMappingURL=FeedRoute.js.map
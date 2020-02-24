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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Plugin_1 = require("../../components/plugins/Plugin");
var LoginRoute_1 = require("./login/LoginRoute");
var path_1 = __importDefault(require("path"));
/**
 * This core plugin handles resources related to any user, including root.
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super.call(this) || this;
    }
    User.prototype.routes = function () {
        return [{
                server: LoginRoute_1.LoginRoute,
                client: path_1.default.resolve(__dirname, 'login/LoginComponent')
            }, {
                server: LoginRoute_1.LoginAction
            }];
    };
    return User;
}(Plugin_1.Plugin));
exports.default = User;
//# sourceMappingURL=user.plugin.js.map
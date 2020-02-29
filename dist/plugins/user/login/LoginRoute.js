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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Route_1 = require("../../../components/router/Route");
var RouteModel_1 = require("../../../components/router/RouteModel");
var fs_1 = __importDefault(require("fs"));
var Cache_1 = __importDefault(require("../../../Cache"));
var Token_1 = require("../Token");
var User_1 = require("../User");
var LoginAction = /** @class */ (function (_super) {
    __extends(LoginAction, _super);
    function LoginAction() {
        var _this = _super.call(this) || this;
        var config = JSON.parse(fs_1.default.readFileSync(Cache_1.default.get('config_path')).toString());
        // Cache root login data.
        LoginAction.RootLogin = {
            username: 'root',
            password: config.user.root.password
        };
        return _this;
    }
    Object.defineProperty(LoginAction.prototype, "route", {
        get: function () {
            return new RouteModel_1.RouteModel({
                method: 'POST',
                endpoint: '/login',
                auth: false,
                schema: {
                    body: {
                        username: { type: 'string', required: true },
                        password: { type: 'string', required: true }
                    }
                },
                handler: this.process.bind(this)
            });
        },
        enumerable: true,
        configurable: true
    });
    LoginAction.prototype.process = function (request, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.process.call(this, request, reply)];
                    case 1:
                        _a.sent();
                        data = {
                            username: request.body.username,
                            password: request.body.password
                        };
                        return [4 /*yield*/, LoginAction.login(data)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginAction.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isRoot, user, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isRoot = data.username == LoginAction.RootLogin.username && data.password == LoginAction.RootLogin.password;
                        // Root login.
                        if (isRoot)
                            return [2 /*return*/, { success: true, token: new Token_1.Token({ payload: 'root', date: new Date(0) }, true).encoded }];
                        if (data.username == LoginAction.RootLogin.username)
                            return [2 /*return*/, { success: false, message: 'Login failed' }];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, User_1.User.login({ username: data.username, rawPassword: data.password })];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        message = error_1.message;
                        return [2 /*return*/, { success: false, message: message }];
                    case 4: return [2 /*return*/, { succes: true, token: user.token }];
                }
            });
        });
    };
    return LoginAction;
}(Route_1.Route));
exports.LoginAction = LoginAction;
//# sourceMappingURL=LoginRoute.js.map
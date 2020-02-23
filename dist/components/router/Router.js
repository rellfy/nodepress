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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var React = __importStar(require("react"));
/**
 * The Router class processes requests coming from NetInterface instances
 */
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router(network, pluginManager) {
        var _this = _super.call(this) || this;
        _this.routes = [];
        _this.network = network;
        _this.pluginManager = pluginManager;
        return _this;
    }
    Object.defineProperty(Router.prototype, "Network", {
        get: function () {
            return this.Network;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "PluginManager", {
        get: function () {
            return this.pluginManager;
        },
        enumerable: true,
        configurable: true
    });
    Router.prototype.initialise = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRoutes()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.compileIndexPage()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initial endpoint handler for NetInterface types integrating with
     * the Router.
     * @param endpoint The request endpoint
     * @param request The request object
     * @param reply The reply object
     */
    Router.prototype.handle = function (netInterface) {
        var http = netInterface.get('http');
        // const udp: NetInterfaceModule = netInterface.get('udp')
        for (var i = 0; i < this.routes.length; i++) {
            http.route(this.routes[i].model);
        }
    };
    Router.getFilesRecursively = function (directory) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var results = [];
                        fs_1.default.readdir(directory, function (error, directoryFiles) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            var i = 0;
                            var next = function () {
                                var file = directoryFiles[i++];
                                if (file == null) {
                                    resolve(results);
                                    return;
                                }
                                file = path_1.default.join(directory, file);
                                fs_1.default.stat(file, function (error, stat) { return __awaiter(_this, void 0, void 0, function () {
                                    var nextResults;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!stat || !stat.isDirectory()) {
                                                    results.push(file);
                                                    next();
                                                    return [2 /*return*/];
                                                }
                                                return [4 /*yield*/, Router.getFilesRecursively(file)];
                                            case 1:
                                                nextResults = _a.sent();
                                                results = results.concat(nextResults);
                                                next();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            };
                            next();
                        });
                    })];
            });
        });
    };
    /**
     * Retrieve routes from path
     * @param routePath The path where routes are exportes
     */
    Router.prototype.getRoutes = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var routes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        routes = [];
                        if (!(input != null && input.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRoutesFromFiles(input)];
                    case 1:
                        // Retrieve from path
                        routes = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        // Retrieve from registered plugins (default)
                        this.pluginManager.Plugins.forEach(function (plugin) {
                            routes = routes.concat(plugin.routes().map(function (r) { return r.server; }));
                        });
                        _a.label = 3;
                    case 3:
                        // Register routes
                        routes.forEach(function (PluginRoute) {
                            var route = new PluginRoute();
                            route.Router = _this;
                            _this.routes.push(route);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.getRoutesFromFiles = function (routePath) {
        return __awaiter(this, void 0, void 0, function () {
            var absolutePath, files, routes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        absolutePath = path_1.default.join(__dirname, routePath);
                        return [4 /*yield*/, Router.getFilesRecursively(absolutePath)];
                    case 1:
                        files = _a.sent();
                        routes = [];
                        files.forEach(function (file) {
                            var Route = require(path_1.default.resolve(absolutePath, file)).Route;
                            if (Route == null)
                                return;
                            routes.push(Route);
                        });
                        return [2 /*return*/, routes];
                }
            });
        });
    };
    Router.prototype.getRoute = function (endpoint) {
        for (var i = 0; i < this.routes.length; i++) {
            if (this.routes[i].Endpoint == endpoint)
                return this.routes[i];
        }
        throw new Error("route \"" + path_1.default + "\" not found");
    };
    Router.prototype.compileIndexPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return Router;
}(events_1.EventEmitter));
exports.Router = Router;
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Test.prototype.render = function () {
        return React.createElement("div", null, "test");
    };
    return Test;
}(React.Component));
//# sourceMappingURL=Router.js.map
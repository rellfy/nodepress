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
var fastify_1 = __importDefault(require("fastify"));
var qs_1 = __importDefault(require("qs"));
var path_1 = __importDefault(require("path"));
var boom_1 = __importDefault(require("boom"));
var NetInterfaceModule_1 = require("./NetInterfaceModule");
var fs_1 = __importDefault(require("fs"));
var Cache_1 = __importDefault(require("../../../Cache"));
var CacheKeys_1 = __importDefault(require("../../../CacheKeys"));
var HttpModule = /** @class */ (function (_super) {
    __extends(HttpModule, _super);
    function HttpModule(https) {
        var _this = _super.call(this) || this;
        _this.server = fastify_1.default(_this.getServerConfig(https));
        var publicPath = path_1.default.resolve(Cache_1.default.get(CacheKeys_1.default.ROOT_PATH), 'public/');
        if (!fs_1.default.existsSync(publicPath))
            return _this;
        _this.server.register(require('fastify-static'), {
            root: publicPath,
            prefix: '/public-np/'
        });
        return _this;
    }
    Object.defineProperty(HttpModule.prototype, "Server", {
        get: function () {
            return this.server;
        },
        enumerable: true,
        configurable: true
    });
    HttpModule.prototype.getServerConfig = function (https) {
        return {
            https: !process.argv.includes('--dev') ? {
                cert: https.cert ? fs_1.default.readFileSync(https.cert) : null,
                key: https.key ? fs_1.default.readFileSync(https.key) : null
            } : null,
            querystringParser: function (str) { return qs_1.default.parse(str); },
            trustProxy: true,
            ignoreTrailingSlash: true
        };
    };
    HttpModule.prototype.route = function (model) {
        var _this = this;
        _super.prototype.route.call(this, model);
        this.server.route({
            method: model.method,
            url: model.endpoint,
            schema: model.schema,
            handler: function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var handler, contentType, e_1, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, model.handler(request, reply)];
                        case 1:
                            handler = _a.sent();
                            contentType = reply.getHeader('Content-Type') ?
                                reply.getHeader('Content-Type') :
                                'application/json';
                            if (handler != null)
                                reply.status(200)
                                    .header('Content-Type', contentType)
                                    .send(handler);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            error = void 0;
                            if (!e_1.isBoom) {
                                error = boom_1.default.internal('Internal server error');
                                console.log("There was an internal error in the route " + model.method, e_1);
                            }
                            else {
                                error = e_1;
                            }
                            reply.status(error.output.statusCode).send(error.output.payload);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    HttpModule.prototype.initialise = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.port = port;
                this.server.register(require('fastify-formbody'));
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.server.listen(_this.port, '0.0.0.0', function (error) {
                            if (error)
                                reject(error);
                            console.log("initialised http server at port " + port);
                            resolve();
                        });
                    })];
            });
        });
    };
    return HttpModule;
}(NetInterfaceModule_1.NetInterfaceModule));
exports.HttpModule = HttpModule;
//# sourceMappingURL=HttpModule.js.map
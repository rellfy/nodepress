"use strict";
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
var boom_1 = __importDefault(require("boom"));
var RouteModel_1 = require("./RouteModel");
var Cache_1 = __importDefault(require("../../Cache"));
var Token_1 = require("../../plugins/user/Token");
var CacheKeys_1 = __importDefault(require("../../CacheKeys"));
/*
{
    method: 'GET',
    url: '/',
    schema: {
        querystring: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
        },
        response: {
        200: {
            type: 'object',
            properties: {
            hello: { type: 'string' }
            }
        }
        }
    },
    handler: function (request, reply) {
        reply.send({ hello: 'world' })
    }
}
*/
var Route = /** @class */ (function () {
    function Route() {
    }
    Object.defineProperty(Route.prototype, "Model", {
        get: function () {
            return this.model || 'empty model';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "Router", {
        set: function (value) {
            this.router = value;
        },
        enumerable: true,
        configurable: true
    });
    Route.parse = function (request) {
        try {
            JSON.parse(request);
        }
        catch (e) {
            throw e;
        }
    };
    Object.defineProperty(Route.prototype, "Endpoint", {
        get: function () {
            return this.model.endpoint;
        },
        enumerable: true,
        configurable: true
    });
    Route.route = function () {
        return new RouteModel_1.RouteModel({
            method: 'GET',
            endpoint: '/',
            schema: {},
            handler: this.process.bind(this)
        });
    };
    Route.prototype.initialise = function (route) {
        // Todo: remove the need for manually initialising with the RouterModel
        // (should get own type's RouterModel)
        this.model = route;
    };
    Route.getDescendantProp = function (object, stack) {
        var arr = stack.split('.');
        while (arr.length && (object = object[arr.shift()]))
            ;
        return object;
    };
    /**
     * Iterate through request object and throw an exception if it doesn't
     * match the schema for the route.
     * TODO: This should also be requested from the front-end when browsing via react router.
     */
    Route.iterate = function (request, object, stack) {
        for (var key in object) {
            if (key == 'type')
                continue;
            if (typeof object[key] == 'object' && object[key].type == null) {
                Route.iterate(request, object[key], stack ? stack + '.' + key : key);
                continue;
            }
            var isRequestFieldNull = Route.getDescendantProp(request, stack ? stack + '.' + key : key) == null;
            var isSchemaFieldRequired = object[key].required;
            if (isSchemaFieldRequired && isRequestFieldNull)
                throw boom_1.default.badRequest(key.charAt(0).toUpperCase() + key.substr(1) + " must be valid");
        }
    };
    Route.isAuthenticated = function (route, request) {
        var _a;
        var cookie = request.headers['cookie'];
        var authCookie = (_a = cookie) === null || _a === void 0 ? void 0 : _a.replace('auth=', '');
        if (authCookie == null && !request.headers['auth'])
            return false;
        return Token_1.Token.validate(authCookie == null ? request.headers['auth'] : authCookie);
    };
    Route.process = function (request, reply, redirectUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var isAuthenticated, schemaNullOrEmpty;
            return __generator(this, function (_a) {
                isAuthenticated = Route.isAuthenticated(this.route(), request);
                if (this.route().auth == true && !isAuthenticated) {
                    // redirectUrl here is 'unauthorized redirect url', e.g. from post page to login.
                    if (!redirectUrl)
                        throw boom_1.default.unauthorized();
                    reply.redirect(redirectUrl);
                    return [2 /*return*/];
                }
                if (this.route().auth == false && isAuthenticated && redirectUrl) {
                    // redirectUrl here is 'authorised redirect url', e.g. from login page to index.
                    reply.redirect(redirectUrl);
                    return [2 /*return*/];
                }
                schemaNullOrEmpty = this.route().schema == null || Object.keys(this.route().schema).length < 1;
                if (!schemaNullOrEmpty && this.route().schema.indexRoute) {
                    // Send index react-router route.
                    reply.header('Content-Type', 'text/html');
                    return [2 /*return*/, Cache_1.default.get(CacheKeys_1.default.ROUTER_INDEX_SRC)];
                }
                if (request == null || (request.body == null && !schemaNullOrEmpty))
                    throw boom_1.default.badRequest();
                Route.iterate(request, this.route().schema);
                return [2 /*return*/];
            });
        });
    };
    return Route;
}());
exports.Route = Route;
//# sourceMappingURL=Route.js.map
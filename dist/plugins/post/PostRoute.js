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
var Route_1 = require("../../components/router/Route");
var RouteModel_1 = require("../../components/router/RouteModel");
var PostModel_1 = require("./PostModel");
var mongoose_1 = __importDefault(require("mongoose"));
var PostRoute = /** @class */ (function (_super) {
    __extends(PostRoute, _super);
    function PostRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PostRoute.prototype, "route", {
        get: function () {
            var _this = this;
            return new RouteModel_1.RouteModel({
                method: 'GET',
                endpoint: '/post',
                auth: true,
                schema: { indexRoute: true },
                handler: function (request, response) { return _this.process(request, response, '/login'); }
            });
        },
        enumerable: true,
        configurable: true
    });
    return PostRoute;
}(Route_1.Route));
exports.PostRoute = PostRoute;
var PostPublish = /** @class */ (function (_super) {
    __extends(PostPublish, _super);
    function PostPublish() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PostPublish.prototype, "route", {
        get: function () {
            return new RouteModel_1.RouteModel({
                method: 'POST',
                endpoint: '/post',
                auth: true,
                schema: {
                    body: {
                        post_title: { type: 'string', required: true },
                        content: { type: 'string', required: true },
                        author: { type: 'string', required: true },
                    }
                },
                handler: this.process.bind(this)
            });
        },
        enumerable: true,
        configurable: true
    });
    PostPublish.prototype.process = function (request, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.process.call(this, request, reply)];
                    case 1:
                        _a.sent();
                        post = {
                            title: request.body.post_title,
                            content: request.body.content,
                            metadata: {
                                date: new Date(),
                                author: request.body.author,
                            }
                        };
                        return [4 /*yield*/, PostPublish.createPost(post)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                }
            });
        });
    };
    PostPublish.createPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var objectId, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        objectId = new mongoose_1.default.Types.ObjectId();
                        post._id = objectId;
                        return [4 /*yield*/, PostModel_1.PostModel.create(post)];
                    case 1:
                        document = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostPublish;
}(Route_1.Route));
exports.PostPublish = PostPublish;
//# sourceMappingURL=PostRoute.js.map
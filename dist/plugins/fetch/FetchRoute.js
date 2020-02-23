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
var mongoose_1 = __importDefault(require("mongoose"));
var PostModel_1 = require("../post/PostModel");
var boom_1 = __importDefault(require("boom"));
var FetchRoute = /** @class */ (function (_super) {
    __extends(FetchRoute, _super);
    function FetchRoute() {
        var _this = _super.call(this) || this;
        _this.initialise(FetchRoute.route());
        return _this;
    }
    FetchRoute.route = function () {
        return new RouteModel_1.RouteModel({
            method: 'POST',
            endpoint: '/fetch',
            // auth: true,
            schema: {
                body: {
                    post_id: { type: 'string', required: false },
                    post_title: { type: 'string', required: false },
                    from_descending_index: { type: 'string', required: false },
                    to_descending_index: { type: 'string', required: false },
                }
            },
            handler: this.process.bind(this)
        });
    };
    FetchRoute.process = function (request, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var fetchMultiple, query, toReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.process.call(this, request, reply)];
                    case 1:
                        _a.sent();
                        fetchMultiple = false;
                        query = {};
                        if (request.body.post_id != null) {
                            query._id = request.body.post_id;
                        }
                        else if (request.body.post_title != null) {
                            // Case insensitive title search.
                            query.title = new RegExp(request.body.post_title, 'i');
                        }
                        else if (request.body.from_descending_index != null && request.body.to_descending_index != null) {
                            fetchMultiple = true;
                        }
                        else {
                            throw boom_1.default.badRequest();
                        }
                        if (!!fetchMultiple) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchPost(query)];
                    case 2:
                        toReturn = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.fetchPosts(parseInt(request.body.from_descending_index), parseInt(request.body.to_descending_index))];
                    case 4:
                        toReturn = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, toReturn];
                }
            });
        });
    };
    FetchRoute.fetchPost = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (query._id != null)
                            query._id = new mongoose_1.default.Types.ObjectId(query._id);
                        return [4 /*yield*/, PostModel_1.PostModel.findOne(query)];
                    case 1:
                        document = _a.sent();
                        if (document == null)
                            throw boom_1.default.notFound('Document not found');
                        return [2 /*return*/, document];
                }
            });
        });
    };
    FetchRoute.fetchPosts = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PostModel_1.PostModel.find().sort('-date').skip(from).limit(Math.abs(to - from) || 1)];
                    case 1:
                        document = _a.sent();
                        if (document == null)
                            throw boom_1.default.notFound('Document not found');
                        return [2 /*return*/, document];
                }
            });
        });
    };
    return FetchRoute;
}(Route_1.Route));
exports.FetchRoute = FetchRoute;
//# sourceMappingURL=FetchRoute.js.map
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
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var boom_1 = __importDefault(require("boom"));
var Model = /** @class */ (function () {
    function Model() {
    }
    Object.defineProperty(Model, "Name", {
        get: function () {
            return 'post';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model, "Schema", {
        get: function () {
            var options = {
                strict: true,
                collection: 'posts'
            };
            var schema = new mongoose_1.default.Schema({
                _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
                title: { type: String, required: true },
                content: { type: String, required: true },
                metadata: {
                    date: { type: Date, required: true },
                    author: { type: String, required: true },
                }
            }, options);
            return Model.Hook(schema);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model, "JoiSchema", {
        get: function () {
            return joi_1.default.object().keys({
                _id: joi_1.default.object(),
                title: joi_1.default.string().min(1),
                content: joi_1.default.string().min(1),
                metadata: joi_1.default.object().keys({
                    date: joi_1.default.date(),
                    author: joi_1.default.string().min(3)
                })
            });
        },
        enumerable: true,
        configurable: true
    });
    Model.Hook = function (Schema) {
        Schema.pre('save', function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, error, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = joi_1.default.validate(Object.assign({}, this), Model.JoiSchema, { allowUnknown: true }), error = _a.error, value = _a.value;
                            if (error)
                                throw new mongoose_1.default.Error(error.message);
                            return [4 /*yield*/, Model.DuplicatePostVerification(this)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        return Schema;
    };
    Model.DuplicatePostVerification = function (model) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var query, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = {
                            title: new RegExp((_a = model.title, (_a !== null && _a !== void 0 ? _a : '')), 'i')
                        };
                        return [4 /*yield*/, PostModel.find(query)];
                    case 1:
                        users = _b.sent();
                        if (users.length > 0)
                            throw boom_1.default.badRequest('This title is used in another post');
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return Model;
}());
var PostModel = mongoose_1.default.model(Model.Name, Model.Schema);
exports.PostModel = PostModel;
//# sourceMappingURL=PostModel.js.map
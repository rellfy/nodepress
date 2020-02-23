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
var UserModel_1 = require("./UserModel");
var mongoose_1 = __importDefault(require("mongoose"));
var Security_1 = require("../../components/crypto/Security");
var fs_1 = __importDefault(require("fs"));
var Cache_1 = __importDefault(require("../../Cache"));
var boom_1 = __importDefault(require("boom"));
var CacheKeys_1 = __importDefault(require("../../CacheKeys"));
/**
 * The User class is the requester of a Client, which communicates to the
 * MPU instance.
 */
var User = /** @class */ (function () {
    function User(options) {
        this.cached = false;
        if (options == null)
            return;
        if (options._id && options.token) {
            this._id = options._id;
            this.token = options.token;
            return;
        }
        if (options.document) {
            this._id = options.document._id;
            this.token = options.document.token;
            this.username = options.document.username;
            this.password = options.document.credentials ? options.document.credentials.password : undefined;
            this.salt = options.document.credentials ? options.document.credentials.salt : undefined;
        }
    }
    User.generateToken = function (rawPayload, date) {
        var NP_EPOCH = Cache_1.default.get(CacheKeys_1.default.NP_EPOCH);
        var rawDelta = (date ? date.getTime() : Date.now()) - NP_EPOCH;
        var payload = Security_1.Security.encodeBase64(rawPayload);
        var delta = Security_1.Security.encodeBase64Number(rawDelta);
        var signature = Security_1.Security.HMAC({ payload: payload, delta: delta }, User.config.secret.key);
        return payload + "." + delta + "." + signature;
    };
    User.checkToken = function (token) {
        // Format:
        // {payload}.{deltatime}.{signature}
        var sections = token.split('.');
        var base64Regex = /^[A-Za-z0-9-_]{2,}$/;
        if (sections.length != 3)
            return false;
        for (var i = 0; i < sections.length; i++) {
            if (!base64Regex.test(sections[i]) || sections[i] == '')
                return false;
        }
        var NP_EPOCH = Cache_1.default.get(CacheKeys_1.default.NP_EPOCH);
        var payload = Security_1.Security.decodeBase64(sections[0]);
        var date = Security_1.Security.decodeBase64Number(sections[1]) + NP_EPOCH;
        var signature = sections[2];
        var match = User.generateToken(payload, date) === token;
        // console.log('========= DECODING TOKEN =========');
        // console.log('Payload: ', payload);
        // console.log('Date: ', date);
        // console.log('Signature: ', signature);
        // console.log('Match?: ', match);
        // console.log('========= DECODING TOKEN =========');
        return match;
    };
    /**
     * Find user ID by token and return an instance
     * @param token User's token
     */
    User.Find = function (token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedID, user, userDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachedID = Cache_1.default.get(token);
                        if (cachedID != null && !options.ignoreCache)
                            return [2 /*return*/, new User({ _id: new mongoose_1.default.Types.ObjectId(cachedID), token: token })];
                        user = {
                            token: token
                        };
                        return [4 /*yield*/, UserModel_1.UserModel.findOne(user)];
                    case 1:
                        userDocument = _a.sent();
                        if (userDocument == null)
                            throw new Error('User not found');
                        return [2 /*return*/, new User({ document: userDocument })];
                }
            });
        });
    };
    User.register = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var encrypted, objectId, token, user, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Security_1.Security.encryptPassword(input.rawPassword)];
                    case 1:
                        encrypted = _a.sent();
                        objectId = new mongoose_1.default.Types.ObjectId();
                        token = this.generateToken(objectId.toHexString());
                        user = {
                            _id: objectId,
                            username: input.username,
                            role: 'user',
                            token: token,
                            email: input.email ? {
                                address: input.email
                            } : undefined,
                            credentials: encrypted
                        };
                        return [4 /*yield*/, UserModel_1.UserModel.create(user)];
                    case 2:
                        document = _a.sent();
                        console.log("Registered user " + user.username);
                        return [2 /*return*/, new User(document)];
                }
            });
        });
    };
    User.login = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var query, user, encrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            username: new RegExp('^' + input.username + '$', 'i')
                        };
                        return [4 /*yield*/, UserModel_1.UserModel.findOne(query)];
                    case 1:
                        user = _a.sent();
                        if (user == null)
                            throw boom_1.default.unauthorized('User not found');
                        if (!user.credentials)
                            throw boom_1.default.internal('Credentials are not set for this account');
                        return [4 /*yield*/, Security_1.Security.encryptPassword(input.rawPassword, user.credentials.salt)];
                    case 2:
                        encrypted = _a.sent();
                        if (user.credentials.password != encrypted.password)
                            throw boom_1.default.unauthorized('Invalid password');
                        console.log("\"" + user.username + "\" logged in");
                        return [2 /*return*/, new User({ document: user })];
                }
            });
        });
    };
    /**
     * Fetch user configutation data from cache or set cache if not set
     */
    User.fetchConfig = function () {
        if (User.config != null)
            return;
        var config;
        try {
            var path = Cache_1.default.get(CacheKeys_1.default.CONFIG_PATH);
            config = JSON.parse(fs_1.default.readFileSync(path).toString());
        }
        catch (e) {
            throw e;
        }
        User.config = config.user;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map
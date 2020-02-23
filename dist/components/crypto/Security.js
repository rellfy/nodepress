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
var crypto_1 = __importDefault(require("crypto"));
var ITERATIONS = 50000;
var BYTES = 64;
var DIGEST = 'base64';
var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var Security = /** @class */ (function () {
    function Security() {
    }
    Security.encryptPassword = function (raw, salt) {
        return __awaiter(this, void 0, void 0, function () {
            var password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = salt || Security.generateSalt(BYTES);
                        return [4 /*yield*/, Security.hashPBKDF2(raw, salt)];
                    case 1:
                        password = _a.sent();
                        return [2 /*return*/, { salt: salt, password: password }];
                }
            });
        });
    };
    Security.parseBase64 = function (code) {
        return code.replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };
    Security.reverseParseBase64 = function (code) {
        return code.replace(/\-/g, '+')
            .replace(/\_/g, '/');
    };
    Security.encodeBase64 = function (input) {
        var value = input;
        if (typeof value == 'object')
            value = JSON.stringify(value);
        var base64 = Buffer.from(value).toString('base64');
        return Security.parseBase64(base64);
    };
    Security.decodeBase64 = function (value) {
        return Buffer.from(Security.reverseParseBase64(value), 'base64').toString();
    };
    Security.encodeBase64Number = function (value) {
        var result = '';
        var mod;
        do {
            mod = value % 64;
            result = ALPHABET.charAt(mod) + result;
            value = Math.floor(value / 64);
        } while (value > 0);
        return result;
    };
    Security.decodeBase64Number = function (value) {
        var result = 0;
        for (var i = 0, len = value.length; i < len; i++) {
            result *= 64;
            result += ALPHABET.indexOf(value[i]);
        }
        return result;
    };
    Security.hashPBKDF2 = function (secret, salt) {
        return new Promise(function (resolve, reject) {
            crypto_1.default.pbkdf2(secret, salt, ITERATIONS, BYTES, 'sha512', function (error, key) {
                if (error) {
                    reject(error);
                    return;
                }
                var result = key.toString(DIGEST);
                if (DIGEST == 'base64')
                    result = Security.parseBase64(result);
                resolve(result);
            });
        });
    };
    Security.generateSalt = function (bytes) {
        var salt = crypto_1.default.randomBytes(bytes).toString(DIGEST);
        if (DIGEST == 'base64')
            salt = Security.parseBase64(salt);
        return salt;
    };
    Security.HMAC = function (payload, secret) {
        var hashed = crypto_1.default.createHmac('sha256', secret).update(JSON.stringify(payload)).digest(DIGEST);
        if (DIGEST == 'base64')
            hashed = Security.parseBase64(hashed);
        return hashed;
    };
    return Security;
}());
exports.Security = Security;
//# sourceMappingURL=Security.js.map
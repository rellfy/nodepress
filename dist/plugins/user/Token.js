"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var Security_1 = require("../../components/crypto/Security");
var Cache_1 = __importDefault(require("../../Cache"));
var boom_1 = __importDefault(require("boom"));
var CacheKeys_1 = __importDefault(require("../../CacheKeys"));
/**
 * Implements a controller for the user authentication Token
 */
var Token = /** @class */ (function () {
    /**
     *
     * @param input Value containing either the encoded Token string or
     * an object with the raw payload and date object
     */
    function Token(input, isDeltaDate) {
        switch (typeof input) {
            case "string":
                // Initialise Token from encoded string.
                this.encoded = input;
                var token = Token.getSections(this.encoded);
                if (token == null)
                    throw boom_1.default.badRequest('Invalid encoded token string');
                this.date = token.date;
                break;
            case "object":
                // Initialise Token from payload/date object.
                this.date = input.date;
                var NP_EPOCH = Cache_1.default.get(CacheKeys_1.default.NP_EPOCH);
                var delta = isDeltaDate ? this.date.getTime() : this.date.getTime() - NP_EPOCH;
                var payload = Security_1.Security.encodeBase64(input.payload);
                var deltaEncoded = Security_1.Security.encodeBase64Number(delta);
                var signature = Security_1.Security.HMAC({ payload: payload, delta: delta }, User_1.User.config.secret.key);
                this.encoded = payload + "." + deltaEncoded + "." + signature;
                break;
            default:
                throw new Error('Initialised Token with no arguments');
        }
    }
    Token.getSections = function (encoded) {
        // Token structure:
        // {payload}.{deltatime}.{signature}
        if (typeof encoded !== 'string')
            return null;
        if (encoded.length < 5)
            return null;
        var sections = encoded.split('.');
        var base64Regex = /^[A-Za-z0-9-_]{1,}$/;
        if (sections.length != 3)
            return null;
        for (var i = 0; i < sections.length; i++) {
            if (!base64Regex.test(sections[i]) || sections[i] == '')
                return null;
        }
        var NP_EPOCH = Cache_1.default.get(CacheKeys_1.default.NP_EPOCH);
        var payload = Security_1.Security.decodeBase64(sections[0]);
        var date = new Date(Security_1.Security.decodeBase64Number(sections[1]) + NP_EPOCH);
        var signature = sections[2];
        // Ensure token is valid before returning sections.
        var match = new Token({ payload: payload, date: date }).encoded === encoded;
        if (!match)
            return null;
        return { payload: payload, date: date, signature: signature };
    };
    Token.validate = function (encoded) {
        return Token.getSections(encoded) !== null;
    };
    Token.prototype.getDate = function () {
        var token = Token.getSections(this.encoded);
        if (token == null)
            return;
        return token.date;
    };
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=Token.js.map
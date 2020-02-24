"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = /** @class */ (function () {
    function Cache() {
        this.storage = {};
    }
    Cache.prototype.set = function (key, value) {
        this.storage[key] = value;
    };
    Cache.prototype.get = function (key) {
        return this.storage[key];
    };
    return Cache;
}());
var cache = new Cache();
exports.default = cache;
//# sourceMappingURL=Cache.js.map
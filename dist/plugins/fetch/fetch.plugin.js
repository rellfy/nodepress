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
Object.defineProperty(exports, "__esModule", { value: true });
var Plugin_1 = require("../../components/plugins/Plugin");
var FetchRoute_1 = require("./FetchRoute");
/**
 * This core plugin handles post retrieval.
 */
var Fetch = /** @class */ (function (_super) {
    __extends(Fetch, _super);
    function Fetch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.routes = [{
                server: new FetchRoute_1.FetchRoute()
            }];
        return _this;
    }
    return Fetch;
}(Plugin_1.Plugin));
exports.default = Fetch;
//# sourceMappingURL=fetch.plugin.js.map
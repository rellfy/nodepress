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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Plugin_1 = require("../../components/plugins/Plugin");
var path_1 = __importDefault(require("path"));
var IndexRoute_1 = require("../../components/router/IndexRoute");
/**
 * This core plugin handles the individual viewing of posts.
 */
var Reader = /** @class */ (function (_super) {
    __extends(Reader, _super);
    function Reader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.routes = [{
                server: new IndexRoute_1.IndexRoute('/read/:post'),
                client: path_1.default.resolve(__dirname, 'ReaderComponent')
            }];
        return _this;
    }
    return Reader;
}(Plugin_1.Plugin));
exports.default = Reader;
//# sourceMappingURL=reader.plugin.js.map
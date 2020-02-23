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
var FeedRoute_1 = require("./FeedRoute");
/**
 * This core plugin handles the feed/index page.
 */
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed() {
        return _super.call(this) || this;
    }
    Feed.prototype.routes = function () {
        return [{
                server: FeedRoute_1.FeedRoute,
                client: path_1.default.resolve(__dirname, 'FeedComponent')
            }];
    };
    return Feed;
}(Plugin_1.Plugin));
exports.default = Feed;
//# sourceMappingURL=feed.plugin.js.map
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
var PostRoute_1 = require("./PostRoute");
var path_1 = __importDefault(require("path"));
/**
 * This core plugin handles the post process and publishing page.
 */
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super.call(this) || this;
    }
    Post.prototype.routes = function () {
        return [{
                server: PostRoute_1.PostRoute,
                client: path_1.default.resolve(__dirname, 'PostComponent')
            }, {
                server: PostRoute_1.PostPublish
            }];
    };
    return Post;
}(Plugin_1.Plugin));
exports.default = Post;
//# sourceMappingURL=post.plugin.js.map
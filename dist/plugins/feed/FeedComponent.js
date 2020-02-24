"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var PostView_1 = require("../reader/PostView");
var FeedContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    width: 100%;\n    margin: 0;\n    grid-template-columns: auto;\n    grid-template-rows: auto;\n    grid-template-areas:\n    \"f f f\"\n    \"f f f\";\n"], ["\n    display: grid;\n    width: 100%;\n    margin: 0;\n    grid-template-columns: auto;\n    grid-template-rows: auto;\n    grid-template-areas:\n    \"f f f\"\n    \"f f f\";\n"])));
var Feed = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    grid-area: f;\n"], ["\n    grid-area: f;\n"])));
var LoadMore = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    grid-area: f;\n    cursor: pointer;\n    border: 2px solid rgba(255,255,255,0.25);;\n    text-align: center;\n    font-size: 0.9rem;\n    line-height: 3.5rem;\n    height: 3.5rem;\n    width: 100%;\n    user-select: none;\n"], ["\n    grid-area: f;\n    cursor: pointer;\n    border: 2px solid rgba(255,255,255,0.25);;\n    text-align: center;\n    font-size: 0.9rem;\n    line-height: 3.5rem;\n    height: 3.5rem;\n    width: 100%;\n    user-select: none;\n"])));
var FeedComponent = /** @class */ (function (_super) {
    __extends(FeedComponent, _super);
    function FeedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FeedComponent.prototype.componentWillMount = function () {
        this.setState({
            posts: [],
            currentDescendingPostIndex: 0,
            loading: true,
            loadedAll: false
        });
    };
    FeedComponent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadPosts(5)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeedComponent.prototype.loadPosts = function (quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var query, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            from_descending_index: this.state.currentDescendingPostIndex,
                            to_descending_index: this.state.currentDescendingPostIndex + quantity
                        };
                        return [4 /*yield*/, PostView_1.PostView.fetchPost(query)];
                    case 1:
                        posts = _a.sent();
                        this.setState({
                            currentDescendingPostIndex: this.state.currentDescendingPostIndex + quantity,
                            posts: __spread(this.state.posts, posts),
                            loading: false,
                            loadedAll: posts.length < quantity
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FeedComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement(FeedContainer, null,
            React.createElement(Feed, null, this.state.posts.reverse().map(function (post, key) {
                return React.createElement(PostView_1.PostView, { retracted: true, post: post, key: key });
            })),
            !this.state.loading && !this.state.loadedAll &&
                React.createElement(LoadMore, { onClick: function () { _this.loadPosts(5); } }, "load more")));
    };
    return FeedComponent;
}(React.Component));
module.exports = FeedComponent;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=FeedComponent.js.map
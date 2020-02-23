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
var styled_components_1 = __importStar(require("styled-components"));
var marked_1 = __importDefault(require("marked"));
var katex_1 = __importDefault(require("katex"));
var PostContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    width: 100%;\n    margin: 2.5rem auto;\n    grid-area: f;\n    grid-template-columns: repeat(1, 100%);\n    grid-template-rows: auto;\n    grid-template-areas:\n    \"t\"\n    \"b\"\n    \"i\"\n    \"c\"\n    \"f\";\n"], ["\n    display: grid;\n    width: 100%;\n    margin: 2.5rem auto;\n    grid-area: f;\n    grid-template-columns: repeat(1, 100%);\n    grid-template-rows: auto;\n    grid-template-areas:\n    \"t\"\n    \"b\"\n    \"i\"\n    \"c\"\n    \"f\";\n"])));
var Title = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    grid-area: t;\n    text-align: left;\n    font-size: 12em;\n    color: #f0f0f0;\n    padding: 0 20% 1.5rem 20%;\n    cursor: pointer;\n    text-transform: uppercase;\n"], ["\n    grid-area: t;\n    text-align: left;\n    font-size: 12em;\n    color: #f0f0f0;\n    padding: 0 20% 1.5rem 20%;\n    cursor: pointer;\n    text-transform: uppercase;\n"])));
var Banner = styled_components_1.default.img(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: inline-block;\n    grid-area: b;\n    padding: 2px ", ";\n    user-select: none;\n    -moz-user-select: none;\n    -webkit-user-drag: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-color: #121319;\n    max-height: 50em;\n"], ["\n    display: inline-block;\n    grid-area: b;\n    padding: 2px ", ";\n    user-select: none;\n    -moz-user-select: none;\n    -webkit-user-drag: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-color: #121319;\n    max-height: 50em;\n"])), function (props) { return props.theme.horizontalPadding; });
var Info = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    grid-area: i;\n    padding: 1rem calc(20% + 1rem);\n"], ["\n    grid-area: i;\n    padding: 1rem calc(20% + 1rem);\n"])));
var InfoElement = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display: inline-block;\n    padding: .25em 1em;\n    background-color: rgba(0,0,0,0.15);\n    color: rgba(255,255,255,0.65);\n    border-radius: .25em;\n    font-size: 0.75em;\n    cursor: default;\n\n    :not(:last-child) {\n        margin-right: .5em;\n    }\n"], ["\n    display: inline-block;\n    padding: .25em 1em;\n    background-color: rgba(0,0,0,0.15);\n    color: rgba(255,255,255,0.65);\n    border-radius: .25em;\n    font-size: 0.75em;\n    cursor: default;\n\n    :not(:last-child) {\n        margin-right: .5em;\n    }\n"])));
var Content = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    grid-area: c;\n    padding: 2rem 20%;\n    font-size: 1.25rem;\n"], ["\n    grid-area: c;\n    padding: 2rem 20%;\n    font-size: 1.25rem;\n"])));
var Footer = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    grid-area: f;\n    margin: auto;\n    width: 80%;\n    height: 1px;\n    background: rgba(255,255,255,0.1);\n"], ["\n    grid-area: f;\n    margin: auto;\n    width: 80%;\n    height: 1px;\n    background: rgba(255,255,255,0.1);\n"])));
var ExpandButton = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    grid-area: f;\n    cursor: pointer;\n    border: 1px solid rgba(255,255,255,0.5);;\n    text-align: center;\n    font-size: 0.8rem;\n    line-height: 2.5rem;\n    height: 2.5rem;\n    width: 80%;\n    margin: auto;\n    margin-bottom: 10em;\n    user-select: none;\n"], ["\n    grid-area: f;\n    cursor: pointer;\n    border: 1px solid rgba(255,255,255,0.5);;\n    text-align: center;\n    font-size: 0.8rem;\n    line-height: 2.5rem;\n    height: 2.5rem;\n    width: 80%;\n    margin: auto;\n    margin-bottom: 10em;\n    user-select: none;\n"])));
var max_retracted_char_count = 500;
var PostView = /** @class */ (function (_super) {
    __extends(PostView, _super);
    function PostView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostView.prototype.componentWillMount = function () {
        this.setPost(this.props.post);
        this.setState({
            expanded: !this.props.retracted,
            imageWidth: 0,
            windowWidth: window.innerWidth
        });
        marked_1.default.setOptions({
            renderer: new marked_1.default.Renderer(),
            gfm: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
        });
    };
    PostView.prototype.componentDidMount = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, pathPostName, query, post;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.handleResize();
                        window.addEventListener('resize', this.handleResize);
                        if (this.props.post != null)
                            return [2 /*return*/];
                        path = location.pathname;
                        pathPostName = path.slice(path.lastIndexOf('/') + 1, path.indexOf('?') > -1 ? path.indexOf('?') : path.length);
                        query = (_a = this.props.query, (_a !== null && _a !== void 0 ? _a : { post_title: pathPostName }));
                        return [4 /*yield*/, PostView.fetchPost(query)];
                    case 1:
                        post = _b.sent();
                        if (post == null) {
                            this.setState({
                                message: 'not found'
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.setPost(post)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostView.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    PostView.prototype.setPost = function (post) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var processedContent, katexCount;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        // @ts-ignore - Convert date from string to object.
                        (_a = post) === null || _a === void 0 ? void 0 : _a.metadata.date = new Date((_b = post) === null || _b === void 0 ? void 0 : _b.metadata.date);
                        processedContent = ((_c = this.state) === null || _c === void 0 ? void 0 : _c.expanded) ? (_d = post) === null || _d === void 0 ? void 0 : _d.content : (_f = (_e = post) === null || _e === void 0 ? void 0 : _e.content.substr(0, max_retracted_char_count), (_f !== null && _f !== void 0 ? _f : ''));
                        katexCount = (processedContent.split('$$').length - 1);
                        // Append "$$" to processed content if cut within a katex input.
                        if (!((_g = this.state) === null || _g === void 0 ? void 0 : _g.expanded) && katexCount % 2 != 0)
                            processedContent += '$$';
                        return [4 /*yield*/, this.processMarked(processedContent)];
                    case 1:
                        // Process marked.
                        processedContent = _h.sent();
                        // Process katex.
                        processedContent = this.processKatex(processedContent);
                        this.setState({
                            post: post,
                            processedContent: processedContent
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostView.fetchPost = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            var _this = this;
            return __generator(this, function (_a) {
                formData = JSON.stringify(query);
                return [2 /*return*/, new Promise(function (resolve) {
                        fetch('/fetch', {
                            method: 'post',
                            body: formData,
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var post, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, response.json()];
                                    case 1:
                                        post = _a.sent();
                                        resolve(post);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_1 = _a.sent();
                                        resolve(null);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    PostView.prototype.onImageLoad = function (event) {
        this.setState({
            imageWidth: event.target.width
        });
    };
    PostView.prototype.handleResize = function () {
        this.setState({
            windowWidth: window.innerWidth
        });
    };
    PostView.prototype.expand = function () {
        if (this.state.expanded || this.state.post == null)
            return;
        // Redirect user to post page.
        var parsedTitle = this.state.post.title.replace(/ /g, '_');
        location.href = location.origin + '/read/' + encodeURI(parsedTitle);
    };
    PostView.prototype.renderExpandButton = function () {
        if (!this.props.retracted || this.state.post == null || this.state.post.content.length <= max_retracted_char_count)
            return;
        return React.createElement(ExpandButton, { onClick: this.expand.bind(this) }, "view full post");
    };
    PostView.prototype.getSuffix = function (n) {
        if (n >= 11 && n <= 13)
            return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };
    PostView.prototype.processMarked = function (input) {
        return new Promise(function (resolve, reject) {
            marked_1.default.parse(input, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    };
    PostView.prototype.processKatex = function (input) {
        ;
        var toProcess = [];
        function replaceAdditive(str, i, removeLength, add) {
            return str.substr(0, i) + add + str.substr(i + removeLength);
        }
        for (var i = input.length; i-- > 1;) {
            var current = toProcess[toProcess.length - 1];
            var foundStart = current != null && current.length == null;
            var foundKatex = input[i] == '$' && input[i - 1] == '$';
            if (!foundKatex)
                continue;
            if (!foundStart) {
                toProcess.push({
                    endIndex: i
                });
                continue;
            }
            current.startIndex = i - 1;
            current.length = current.endIndex - current.startIndex - 1;
            current.string = katex_1.default.renderToString(input.substr(current.startIndex + 2, current.length - 2));
            // Store current input length.
            var length_1 = input.length;
            // Replace string with processed formula.
            input = replaceAdditive(input, current.startIndex, current.length + 2, current.string);
            // Compensate for length change.
            i -= length_1 - input.length;
            var classIndex = -1;
            // Add inline class to element if it contains text along the equation.
            if (current.startIndex > 0 && current.endIndex < input.length - 1 && input[current.startIndex - 1] != '>' && input[current.endIndex + 1] != '<') {
                for (var j = current.startIndex; j-- > 0;) {
                    if (input[j] != '<' || input[j + 1] != 'p')
                        continue;
                    classIndex = j + 2;
                    break;
                }
            }
            // Add inline class if needed.
            if (classIndex > -1)
                input = replaceAdditive(input, classIndex, 0, ' class="inline"');
            // Compensate for length change.
            i -= length_1 - input.length;
        }
        return input;
    };
    PostView.prototype.renderInfo = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var info = [];
        // Publishing date.
        var edits = (_b = (_a = this.state.post) === null || _a === void 0 ? void 0 : _a.metadata.edits, (_b !== null && _b !== void 0 ? _b : 0));
        var edited = edits > 0;
        console.log('metadata: ', (_c = this.state.post) === null || _c === void 0 ? void 0 : _c.metadata);
        var published = (edited ? 'First p' : 'P') + "ublished on " + ((_d = this.state.post) === null || _d === void 0 ? void 0 : _d.metadata.date.toLocaleDateString());
        info[info.length] = published;
        // Current edition.     
        var edition = (edits + 1).toString();
        var currentEdition = edited ? "" + edition + this.getSuffix(parseInt(edition)) + " edition" : '';
        if (currentEdition != '')
            info[info.length] = currentEdition;
        // Author.
        var author = ((_e = this.state.post) === null || _e === void 0 ? void 0 : _e.metadata.author) ? "by " + ((_f = this.state.post) === null || _f === void 0 ? void 0 : _f.metadata.author) : '';
        if (author != '')
            info[info.length] = author;
        // Tags.
        if (((_g = this.state.post) === null || _g === void 0 ? void 0 : _g.metadata.tags) != null)
            info = __spread(info, (_h = this.state.post) === null || _h === void 0 ? void 0 : _h.metadata.tags);
        return info;
    };
    PostView.prototype.render = function () {
        var _a;
        if (this.state.post == null || this.state.processedContent == null)
            return (React.createElement("div", null, this.state.message ? this.state.message : ''));
        return (React.createElement(PostContainer, null,
            React.createElement(Title, { onClick: this.expand.bind(this), className: "title" }, this.state.post.title),
            this.state.post.metadata.image != null &&
                React.createElement(styled_components_1.ThemeProvider, { theme: { horizontalPadding: (this.state.windowWidth - this.state.imageWidth) / 2 + "px" } },
                    React.createElement(Banner, { src: this.state.post.metadata.image, onLoad: this.onImageLoad.bind(this) })),
            React.createElement(Info, null, this.renderInfo().map(function (text, key) {
                return React.createElement(InfoElement, { key: key }, text);
            })),
            React.createElement(Content, { dangerouslySetInnerHTML: { __html: (_a = this.state.processedContent, (_a !== null && _a !== void 0 ? _a : '')) } }),
            this.renderExpandButton(),
            React.createElement(Footer, null)));
    };
    return PostView;
}(React.Component));
exports.PostView = PostView;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=PostView.js.map
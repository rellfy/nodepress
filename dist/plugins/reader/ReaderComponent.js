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
var PostView_1 = require("./PostView");
var ReaderContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    width: 100%;\n    margin: 0;\n    grid-template-columns: auto;\n    grid-template-rows: auto;\n    grid-template-areas:\n    \"f f f\"\n    \"f f f\";\n"], ["\n    display: grid;\n    width: 100%;\n    margin: 0;\n    grid-template-columns: auto;\n    grid-template-rows: auto;\n    grid-template-areas:\n    \"f f f\"\n    \"f f f\";\n"])));
var PostComponent = /** @class */ (function (_super) {
    __extends(PostComponent, _super);
    function PostComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostComponent.prototype.componentWillMount = function () {
        this.setState({});
    };
    Object.defineProperty(PostComponent.prototype, "postTitle", {
        get: function () {
            var i = location.pathname.lastIndexOf('/');
            var l = location.pathname.length;
            return location.pathname.substr(i + 1, l - 1);
        },
        enumerable: true,
        configurable: true
    });
    PostComponent.prototype.render = function () {
        return (React.createElement(ReaderContainer, null,
            React.createElement(PostView_1.PostView, { query: { post_title: this.postTitle } })));
    };
    return PostComponent;
}(React.Component));
module.exports = PostComponent;
var templateObject_1;
//# sourceMappingURL=ReaderComponent.js.map
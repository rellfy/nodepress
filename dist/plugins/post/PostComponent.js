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
var PostPanel = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    width: 80vw;\n    margin: 3vh auto;\n    grid-template-columns: repeat(4, 19.9vw);\n    grid-template-rows: 7vh 83vh;\n    grid-template-areas:\n    \"h h h s\"\n    \"p p p s\";\n"], ["\n    display: grid;\n    width: 80vw;\n    margin: 3vh auto;\n    grid-template-columns: repeat(4, 19.9vw);\n    grid-template-rows: 7vh 83vh;\n    grid-template-areas:\n    \"h h h s\"\n    \"p p p s\";\n"])));
var Title = styled_components_1.default.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    grid-area: h;\n    position: relative;\n    height: 85%;\n    background-color: rgba(255,255,255,0.025);\n    outline: none;\n    border: none;\n    color: #f0f0f0;\n    font-size: 1.5em;\n    font-weight: 100;\n    text-align: left;\n    padding: 0.5% 2.5%;\n"], ["\n    grid-area: h;\n    position: relative;\n    height: 85%;\n    background-color: rgba(255,255,255,0.025);\n    outline: none;\n    border: none;\n    color: #f0f0f0;\n    font-size: 1.5em;\n    font-weight: 100;\n    text-align: left;\n    padding: 0.5% 2.5%;\n"])));
var TextBox = styled_components_1.default.textarea(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    grid-area: p;\n    background-color: rgba(255,255,255,0.025);\n    outline: none;\n    border: none;\n    color: #f0f0f0;\n    max-width: 100%;\n    min-width: 100%;\n    padding: 2.5%;\n    resize: none;\n    font-size: 1em;\n    white-space: pre-wrap;\n"], ["\n    grid-area: p;\n    background-color: rgba(255,255,255,0.025);\n    outline: none;\n    border: none;\n    color: #f0f0f0;\n    max-width: 100%;\n    min-width: 100%;\n    padding: 2.5%;\n    resize: none;\n    font-size: 1em;\n    white-space: pre-wrap;\n"])));
var Sidebar = styled_components_1.default.aside(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    grid-area: s;\n"], ["\n    grid-area: s;\n"])));
var SidebarButton = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    transition: background 0.2s, color 0.2s;\n    background: rgba(0,200,255,0.15);\n    color: #ccc;\n    text-align: center;\n    padding: 20px;\n    width: 75%;\n    margin: auto;\n    cursor: default;\n\n    &.active {\n        background: #00aaee;\n        color: #f0f0f0;\n        cursor: pointer;\n    }    \n"], ["\n    transition: background 0.2s, color 0.2s;\n    background: rgba(0,200,255,0.15);\n    color: #ccc;\n    text-align: center;\n    padding: 20px;\n    width: 75%;\n    margin: auto;\n    cursor: default;\n\n    &.active {\n        background: #00aaee;\n        color: #f0f0f0;\n        cursor: pointer;\n    }    \n"])));
var SidebarInput = styled_components_1.default.input(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    background: rgba(255, 255, 255, 0.024);\n    color: #ccc;\n    text-align: left;\n    padding: 20px;\n    width: 75%;\n    margin: auto;\n    margin-top: 10px;\n    border: 1px solid rgba(255,255,255,0.3);\n    display: block;\n"], ["\n    background: rgba(255, 255, 255, 0.024);\n    color: #ccc;\n    text-align: left;\n    padding: 20px;\n    width: 75%;\n    margin: auto;\n    margin-top: 10px;\n    border: 1px solid rgba(255,255,255,0.3);\n    display: block;\n"])));
var PostComponent = /** @class */ (function (_super) {
    __extends(PostComponent, _super);
    function PostComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostComponent.prototype.componentWillMount = function () {
        this.setState({
            content: '',
            title: '',
            author: ''
        });
    };
    Object.defineProperty(PostComponent.prototype, "canPublish", {
        get: function () {
            return this.state.content.length > 0 && this.state.title.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    PostComponent.prototype.updateInput = function (event) {
        // @ts-ignore
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    };
    PostComponent.prototype.publish = function () {
        var _this = this;
        if (!this.canPublish)
            return;
        console.log('Publishing...');
        var formData = JSON.stringify({
            post_title: this.state.title,
            author: this.state.author || 'anonynous',
            content: this.state.content
        });
        fetch('/post', {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            _this.setState({
                content: '',
                title: ''
            });
            alert('Published');
            location.reload();
        });
    };
    PostComponent.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(PostPanel, null,
                React.createElement(Title, { name: "title", placeholder: "Post title", value: this.state.title, onChange: this.updateInput.bind(this) }),
                React.createElement(TextBox, { name: "content", placeholder: "Write your quality content here", onChange: this.updateInput.bind(this) }, this.state.content),
                React.createElement(Sidebar, null,
                    React.createElement(SidebarButton, { className: this.canPublish ? 'active' : '', onClick: this.publish.bind(this) }, "Publish"),
                    React.createElement(SidebarInput, { className: this.canPublish ? 'active' : '', name: "author", value: this.state.author, onChange: this.updateInput.bind(this), placeholder: "Author" })))));
    };
    return PostComponent;
}(React.Component));
module.exports = PostComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=PostComponent.js.map
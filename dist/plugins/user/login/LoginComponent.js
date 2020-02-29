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
var LoginPanel = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    transition: width .2s left .2s;\n    display: block;\n    width: 70vw;\n    height: 40em;\n    position: absolute;\n    top: calc((100vh / 2) - 20em);\n    left: calc((100vw / 2) - 35vw);\n    background: rgba(0,0,0,0.25);\n\n    @media screen and (min-width: 900px) {\n        width: 50vw;\n        left: calc((100vw / 2) - 25vw);\n    }\n\n    @media screen and (min-width: 1600px) {\n        width: 30vw;\n        left: calc((100vw / 2) - 15vw);\n    }\n"], ["\n    transition: width .2s left .2s;\n    display: block;\n    width: 70vw;\n    height: 40em;\n    position: absolute;\n    top: calc((100vh / 2) - 20em);\n    left: calc((100vw / 2) - 35vw);\n    background: rgba(0,0,0,0.25);\n\n    @media screen and (min-width: 900px) {\n        width: 50vw;\n        left: calc((100vw / 2) - 25vw);\n    }\n\n    @media screen and (min-width: 1600px) {\n        width: 30vw;\n        left: calc((100vw / 2) - 15vw);\n    }\n"])));
var Title = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: block;\n    margin: 0;\n    width: 100%;\n    height: 1.5em;\n    padding: 1em 0;\n    font-size: 2em;\n    text-align: center;\n    color: #fff;\n"], ["\n    display: block;\n    margin: 0;\n    width: 100%;\n    height: 1.5em;\n    padding: 1em 0;\n    font-size: 2em;\n    text-align: center;\n    color: #fff;\n"])));
var LoginMessageBox = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    color: #f0f0f0;\n    display: block;\n    width: 100%;\n    height: 2em;\n    padding: 1em 0;\n    text-align: center;\n"], ["\n    color: #f0f0f0;\n    display: block;\n    width: 100%;\n    height: 2em;\n    padding: 1em 0;\n    text-align: center;\n"])));
var LoginInput = styled_components_1.default.input(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    color: #e0e0e0;\n    display: block;\n    width: 80%;\n    height: 4em;\n    padding: 3em;\n    text-align: left;\n    margin: 2em auto;\n    background: rgba(1,1,1,0.25);\n    border: none;\n"], ["\n    color: #e0e0e0;\n    display: block;\n    width: 80%;\n    height: 4em;\n    padding: 3em;\n    text-align: left;\n    margin: 2em auto;\n    background: rgba(1,1,1,0.25);\n    border: none;\n"])));
var LoginButton = styled_components_1.default.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    transition: background-color .1s;\n    color: rgba(255,255,255,0.4);\n    display: block;\n    width: 65%;\n    padding: 2em 1em;\n    margin: 1em auto;\n    background-color: rgba(255,255,255,.05);\n    border: 2px solid rgba(0,0,0,0.4);\n    cursor: pointer;\n    outline: none;\n\n    :hover {\n        background-color: rgba(255,255,255,.075);\n    }\n\n    :active {\n        background-color: rgba(255,255,255,.1);\n    }\n"], ["\n    transition: background-color .1s;\n    color: rgba(255,255,255,0.4);\n    display: block;\n    width: 65%;\n    padding: 2em 1em;\n    margin: 1em auto;\n    background-color: rgba(255,255,255,.05);\n    border: 2px solid rgba(0,0,0,0.4);\n    cursor: pointer;\n    outline: none;\n\n    :hover {\n        background-color: rgba(255,255,255,.075);\n    }\n\n    :active {\n        background-color: rgba(255,255,255,.1);\n    }\n"])));
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginComponent.prototype.componentWillMount = function () {
        this.setState({
            username: '',
            password: '',
            message: ''
        });
    };
    LoginComponent.prototype.updateInput = function (event) {
        // @ts-ignore
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    };
    LoginComponent.prototype.login = function (e) {
        var _this = this;
        e.preventDefault();
        var formData = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });
        fetch('/login', {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            _this.setState({
                password: '',
                message: 'Logging in'
            });
            return response.json();
        }).then(function (data) {
            _this.setState({
                message: data.success ? 'Redirecting...' : 'Login failed'
            });
            if (!data.success)
                return;
            document.cookie = "auth=" + data.token + "; expires=0; path=/";
            setTimeout(_this.redirect, 250);
        });
    };
    LoginComponent.prototype.redirect = function () {
        var params = new URLSearchParams(window.location.search);
        if (params.has('to')) {
            location.href = location.origin + params.get('to');
            return;
        }
        location.href = location.origin;
    };
    LoginComponent.prototype.render = function () {
        return (React.createElement(LoginPanel, null,
            React.createElement(Title, null, "Login"),
            React.createElement(LoginMessageBox, null, this.state.message),
            React.createElement("form", { onSubmit: this.login.bind(this) },
                React.createElement(LoginInput, { onChange: this.updateInput.bind(this), name: "username", type: "text", placeholder: "Username" }),
                React.createElement(LoginInput, { onChange: this.updateInput.bind(this), name: "password", type: "password", placeholder: "Password" }),
                React.createElement(LoginButton, { name: "submit", type: "submit" }, "dewit"))));
    };
    return LoginComponent;
}(React.Component));
module.exports = LoginComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=LoginComponent.js.map
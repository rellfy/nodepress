"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var util_1 = __importDefault(require("util"));
var fs_1 = __importDefault(require("fs"));
var webpack = require("webpack");
var NodeBuilder = /** @class */ (function () {
    function NodeBuilder() {
    }
    Object.defineProperty(NodeBuilder, "FolderPath", {
        get: function () {
            return path_1.default.resolve(__dirname, 'np_builder');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the input page as a string (JS)
     */
    NodeBuilder.PageString = function (plugins) {
        var routes = [];
        plugins.forEach(function (plugin, i) {
            plugin.routes.forEach(function (route) {
                if (route.client == null)
                    return;
                routes.push(route);
            });
        });
        var pluginDefinitionStr = '';
        routes.forEach(function (route, i) {
            if (route.client == null)
                return;
            pluginDefinitionStr += "var Plugin" + i + " = require(\"" + route.client.replace(/\\/g, '/') + ".js\");\n";
        });
        var routeDeclarationStr = '';
        routes.forEach(function (route, i) {
            var model = route.server.route;
            routeDeclarationStr += "React.createElement(Route, { " + (model.exactPath ? 'exact:true,' : '') + " path:\"" + model.endpoint + "\", component:Plugin" + i + " })" + (i < routes.length - 1 ? ',\n' : '');
        });
        // Note this is not transpiled by Typescript, and hence needs to be written in JS.
        return "(function() {\n            var React = require('react');\n            var ReactDOM = require('react-dom');\n            var ReactRouterDOM = require('react-router-dom');\n            var Router = ReactRouterDOM.BrowserRouter;\n            var Route = ReactRouterDOM.Route;\n            var History = require('history');\n\n            " + pluginDefinitionStr + "\n\n            var element = (React.createElement(Router, null,\n                React.createElement(\"div\", null,\n                    " + routeDeclarationStr + "\n                )\n            ));\n            \n            ReactDOM.render(element, document.getElementById('root'));\n        })();";
    };
    NodeBuilder.WebpackConfig = function () {
        return {
            entry: path_1.default.resolve(NodeBuilder.FolderPath, NodeBuilder.InputFilename),
            output: {
                filename: NodeBuilder.OutputFilename,
                path: path_1.default.resolve(NodeBuilder.FolderPath, '../')
            },
            devtool: 'source-map',
            resolve: {
                extensions: ['.tsx', '.jsx', '.js', '.json']
            },
            module: {
                rules: [
                    { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
                    { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ },
                    { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ }
                ]
            }
        };
    };
    NodeBuilder.BuildPage = function (layout, plugins) {
        return __awaiter(this, void 0, void 0, function () {
            var e, error_1, script;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        NodeBuilder.CreateFolder();
                        return [4 /*yield*/, NodeBuilder.CreateFile(NodeBuilder.InputFilename, NodeBuilder.PageString(plugins))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, util_1.default.promisify(webpack)([NodeBuilder.WebpackConfig()])];
                    case 3:
                        e = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1)
                            throw error_1;
                        return [3 /*break*/, 5];
                    case 5:
                        NodeBuilder.DeleteFolder();
                        return [4 /*yield*/, util_1.default.promisify(fs_1.default.readFile)(path_1.default.resolve(NodeBuilder.FolderPath, '../', NodeBuilder.OutputFilename))];
                    case 6:
                        script = _a.sent();
                        return [2 /*return*/, this.GetHTML(layout.body, layout.head, script.toString('utf8'))];
                }
            });
        });
    };
    NodeBuilder.GetHTML = function (bodyPath, headPath, script) {
        return __awaiter(this, void 0, void 0, function () {
            var head, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.default.promisify(fs_1.default.readFile)(headPath)];
                    case 1:
                        head = _a.sent();
                        return [4 /*yield*/, util_1.default.promisify(fs_1.default.readFile)(bodyPath)];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, "<!DOCTYPE html><html><head>" + head.toString('utf8') + "</head><body><div id=\"root\"></div>" + body.toString('utf8') + "<script type=\"text/javascript\">" + script + "</script></body></html>"];
                }
            });
        });
    };
    NodeBuilder.CreateFile = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path_1.default.resolve(NodeBuilder.FolderPath, name);
                        return [4 /*yield*/, util_1.default.promisify(fs_1.default.writeFile)(filePath, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates temporary folder for building process
     */
    NodeBuilder.CreateFolder = function () {
        if (fs_1.default.existsSync(NodeBuilder.FolderPath))
            return;
        fs_1.default.mkdirSync(NodeBuilder.FolderPath);
    };
    /**
     * Deletes folder once building is done
     */
    NodeBuilder.DeleteFolder = function (folder) {
        if (folder === void 0) { folder = NodeBuilder.FolderPath; }
        if (!fs_1.default.existsSync(folder))
            return;
        fs_1.default.readdirSync(folder).forEach(function (entry) {
            var entry_path = path_1.default.join(folder, entry);
            if (fs_1.default.lstatSync(entry_path).isDirectory()) {
                NodeBuilder.DeleteFolder(entry_path);
            }
            else {
                fs_1.default.unlinkSync(entry_path);
            }
        });
        fs_1.default.rmdirSync(folder);
    };
    NodeBuilder.InputFilename = 'np.jsx';
    NodeBuilder.OutputFilename = 'np.js';
    return NodeBuilder;
}());
exports.NodeBuilder = NodeBuilder;
//# sourceMappingURL=NodeBuilder.js.map
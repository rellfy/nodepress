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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var events_1 = require("events");
var fs_1 = __importDefault(require("fs"));
var Cache_1 = __importDefault(require("./Cache"));
var Network_1 = require("./components/network/Network");
var PluginManager_1 = require("./components/plugins/PluginManager");
var User_1 = require("./plugins/user/User");
var NodeBuilder_1 = require("./NodeBuilder");
var Database_1 = require("./components/database/Database");
// Core plugins
var post_plugin_1 = __importDefault(require("./plugins/post/post.plugin"));
var fetch_plugin_1 = __importDefault(require("./plugins/fetch/fetch.plugin"));
var feed_plugin_1 = __importDefault(require("./plugins/feed/feed.plugin"));
var reader_plugin_1 = __importDefault(require("./plugins/reader/reader.plugin"));
var user_plugin_1 = __importDefault(require("./plugins/user/user.plugin"));
var CacheKeys_1 = __importDefault(require("./CacheKeys"));
// TODO: Export NodeBuilder functions.
/**
 * Server instance
 */
var NodePress = /** @class */ (function (_super) {
    __extends(NodePress, _super);
    function NodePress(args) {
        var _a, _b;
        var _this = _super.call(this) || this;
        // Load configuration files
        _this.fetchConfig(args.config);
        User_1.User.fetchConfig();
        // Set config.args.
        _this.config.args = __assign(__assign({}, args), { 
            // Set optional values to their default.
            dev: (_a = args.dev, (_a !== null && _a !== void 0 ? _a : false)), ignoreCorePlugins: (_b = args.ignoreCorePlugins, (_b !== null && _b !== void 0 ? _b : false)) });
        // Set cache
        Cache_1.default.set(CacheKeys_1.default.IS_DEV_ENV, _this.config.args.dev);
        Cache_1.default.set(CacheKeys_1.default.ROOT_PATH, __dirname);
        Cache_1.default.set(CacheKeys_1.default.NP_EPOCH, _this.config.api.np_epoch);
        // Load modules
        _this.pluginManager = new PluginManager_1.PluginManager();
        if (!_this.config.args.ignoreCorePlugins)
            _this.pluginManager.addPlugins([post_plugin_1.default, fetch_plugin_1.default, feed_plugin_1.default, reader_plugin_1.default, user_plugin_1.default]);
        // Add default components.
        _this.network = new Network_1.Network(_this.config.net, _this);
        _this.database = new Database_1.Database(_this.config.db);
        _this.pluginManager.on('add_plugin', _this.buildIndex.bind(_this));
        // Initialise modules
        _this.run();
        _this.buildIndex();
        return _this;
    }
    Object.defineProperty(NodePress.prototype, "PluginManager", {
        get: function () {
            return this.pluginManager;
        },
        enumerable: true,
        configurable: true
    });
    NodePress.prototype.plugin = function (plugin) {
        if (Array.isArray(plugin)) {
            this.pluginManager.addPlugins(plugin);
            return;
        }
        this.pluginManager.addPlugin(plugin);
    };
    NodePress.prototype.fetchConfig = function (configPath) {
        if (typeof configPath != 'string')
            throw new Error('Config path not passed in arguments. Use --config');
        console.log("Loading config from " + configPath);
        this.config = JSON.parse(fs_1.default.readFileSync(configPath).toString());
        Cache_1.default.set(CacheKeys_1.default.CONFIG_PATH, configPath);
    };
    NodePress.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialiseDatabase()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.network.listen(this.config.net)];
                    case 2:
                        _a.sent();
                        console.log("This server instance is now running");
                        return [2 /*return*/];
                }
            });
        });
    };
    NodePress.prototype.initialiseDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.connect()];
                    case 1:
                        _a.sent();
                        console.log("database connection established");
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error("could not connect to the database", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NodePress.prototype.buildIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NodeBuilder_1.NodeBuilder.BuildPage(this.config.args.layout, this.PluginManager.Plugins)];
                    case 1:
                        page = _a.sent();
                        Cache_1.default.set(CacheKeys_1.default.ROUTER_INDEX_SRC, page);
                        return [2 /*return*/];
                }
            });
        });
    };
    return NodePress;
}(events_1.EventEmitter));
exports.NodePress = NodePress;
exports.default = NodePress;
module.exports = NodePress;
//# sourceMappingURL=NodePress.js.map
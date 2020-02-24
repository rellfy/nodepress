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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var PluginManager = /** @class */ (function (_super) {
    __extends(PluginManager, _super);
    function PluginManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.plugins = [];
        return _this;
    }
    Object.defineProperty(PluginManager.prototype, "Plugins", {
        get: function () {
            return this.plugins;
        },
        enumerable: true,
        configurable: true
    });
    PluginManager.prototype.addPlugin = function (plugin) {
        this.emit('add_plugin');
        this.initialisePlugin(plugin);
    };
    PluginManager.prototype.addPlugins = function (plugins) {
        var _this = this;
        this.emit('add_plugin');
        plugins.forEach(function (plugin) {
            _this.initialisePlugin(plugin);
        });
    };
    PluginManager.prototype.initialisePlugin = function (PluginType) {
        this.plugins.push(new PluginType());
    };
    return PluginManager;
}(events_1.EventEmitter));
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map
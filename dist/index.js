"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodePress_1 = require("./NodePress");
var isDevEnv = process.argv.includes('--dev');
var config = {
    dev: isDevEnv,
    plugins: [],
    ignoreCorePlugins: false
};
var instance = new NodePress_1.NodePress(config);
//# sourceMappingURL=index.js.map
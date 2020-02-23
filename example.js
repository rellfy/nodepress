const NodePress = require('./dist/NodePress');
const path = require('path');

const isDevEnv = process.argv.includes('--dev');
const args = {
    // Make config.json and set it up with an actual MongoDB URI.
    config: path.resolve(__dirname, 'config.json'),
    layout: {
        body: path.resolve(__dirname, 'layout/body.html'),
        head: path.resolve(__dirname, 'layout/head.html')
    },
    plugins: [],
    dev: isDevEnv,
    ignoreCorePlugins: false
};

const instance = new NodePress(args);
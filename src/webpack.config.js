const path = require('path');

// Currently only one config, for the index page.
module.exports = {
    entry: './components/router/pages/index_output.tsx',
    output: {
        filename: 'np-build.js',
        path: path.resolve(__dirname, '../out/public/')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ }
        ]
    }
}
import { Plugin, IPluginRoute } from "./components/plugins/Plugin";
import cache from "./Cache";
import path from "path";
import util from "util";
import fs from "fs";

import webpack = require("webpack");

class NodeBuilder {

    private static InputFilename: string = 'np.jsx';
    private static OutputFilename: string = 'np.js';

    private static get FolderPath(): string {
        return path.resolve(__dirname, 'np_builder');
    }

    /**
     * Returns the input page as a string
     */
    public static PageString(plugins: Plugin[]) {
        const routes: IPluginRoute[] = [];

        plugins.forEach((plugin, i) => {
            plugin.routes().forEach((route) => {
                if (route.client == null)
                    return;
                    
                routes.push(route);
            });
        });

        let pluginDefinitionStr = '';

        routes.forEach((route, i) => {
            if (route.client == null)
                return;

            pluginDefinitionStr += `const Plugin${i} = require("${route.client.replace(/\\/g, '/')}.js");\n`
        });

        let routeDeclarationStr = '';

        routes.forEach((route, i) => {
            routeDeclarationStr += `<Route path="${route.server.route().endpoint}" component={Plugin${i}} />\n`
        });

        //return `(${NodeBuilder.Page.toString()})();`
        return `(function() {
            const React = require('react');
            const ReactDOM = require('react-dom');
            const ReactRouterDOM = require('react-router-dom');
            const Router = ReactRouterDOM.BrowserRouter;
            const Route = ReactRouterDOM.Route;
            //const History = require('history');

            ${pluginDefinitionStr}

            const element = (
                <Router>
                    <div>
                        ${routeDeclarationStr}
                    </div>
                </Router>
            );

            ReactDOM.render(element, document.getElementById('root'));
        })();`
    }

    public static WebpackConfig(): webpack.Configuration {
        return {
            entry: path.resolve(NodeBuilder.FolderPath, NodeBuilder.InputFilename),
            output: {
                filename: NodeBuilder.OutputFilename,
                path: path.resolve(NodeBuilder.FolderPath, '../')
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
        }
    }

    public static async BuildPage(plugins: Plugin[]): Promise<string> {
        let output = '';

        NodeBuilder.CreateFolder();
        await NodeBuilder.CreateFile(NodeBuilder.InputFilename, NodeBuilder.PageString(plugins));

        let e;
        try {
            e = await util.promisify(webpack)([NodeBuilder.WebpackConfig()]);
        } catch(error) {
            if (error)
            throw error;
        }

        NodeBuilder.DeleteFolder();

        return output;
    }

    public static async CreateFile(name: string, data: any) {
        let filePath = path.resolve(NodeBuilder.FolderPath, name);
        await util.promisify(fs.writeFile)(filePath, data);
    }

    /**
     * Creates temporary folder for building process
     */
    public static CreateFolder() {
        if (fs.existsSync(NodeBuilder.FolderPath))
            return;
        
        fs.mkdirSync(NodeBuilder.FolderPath)
    }

    /**
     * Deletes folder once building is done
     */
    public static DeleteFolder(folder: string = NodeBuilder.FolderPath) {
        if (!fs.existsSync(folder))
            return;

        fs.readdirSync(folder).forEach((entry) => {
            let entry_path = path.join(folder, entry);

            if (fs.lstatSync(entry_path).isDirectory()) {
                NodeBuilder.DeleteFolder(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });

        fs.rmdirSync(folder);
    }
}

export { NodeBuilder };
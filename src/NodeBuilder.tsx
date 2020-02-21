import { Plugin, IPluginRoute } from "./components/plugins/Plugin";
import cache from "./Cache";
import path from "path";
import util from "util";
import fs from "fs";

import webpack = require("webpack");
import { RouteModel } from "./components/router/RouteModel";

class NodeBuilder {

    private static InputFilename: string = 'np.jsx';
    private static OutputFilename: string = 'np.js';
    private static LayoutFolder: string = '../layout/';

    private static get FolderPath(): string {
        return path.resolve(__dirname, 'np_builder');
    }

    /**
     * Returns the input page as a string (JS)
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

        let pluginDefinitionStr: string = '';

        routes.forEach((route, i) => {
            if (route.client == null)
                return;

            pluginDefinitionStr += `var Plugin${i} = require("${route.client.replace(/\\/g, '/')}.js");\n`
        });

        let routeDeclarationStr: string = '';

        routes.forEach((route, i) => {
            let model: RouteModel = route.server.route();
            routeDeclarationStr += `React.createElement(Route, { ${model.exactPath ? 'exact:true,':''} path:"${model.endpoint}", component:Plugin${i} })${i < routes.length-1 ? ',\n':''}`;
        });

        // Note this is not transpiled by Typescript, and hence needs to be written in JS.
        return `(function() {
            var React = require('react');
            var ReactDOM = require('react-dom');
            var ReactRouterDOM = require('react-router-dom');
            var Router = ReactRouterDOM.BrowserRouter;
            var Route = ReactRouterDOM.Route;
            var History = require('history');

            ${pluginDefinitionStr}

            var element = (React.createElement(Router, null,
                React.createElement("div", null,
                    ${routeDeclarationStr}
                )
            ));
            
            ReactDOM.render(element, document.getElementById('root'));
        })();`;
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
        
        // Error here - not found
        const script = await util.promisify(fs.readFile)(path.resolve(NodeBuilder.FolderPath, '../', NodeBuilder.OutputFilename));

        return this.GetHTML(script.toString('utf8'));
    }

    private static async GetHTML(script: string) {
        const head = await util.promisify(fs.readFile)(path.resolve(__dirname, NodeBuilder.LayoutFolder, 'head.html'));
        const body = await util.promisify(fs.readFile)(path.resolve(__dirname, NodeBuilder.LayoutFolder, 'body.html'));

        return `<!DOCTYPE html><html><head>${head.toString('utf8')}</head><body><div id="root"></div>${body.toString('utf8')}<script type="text/javascript">${script}</script></body></html>`;
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
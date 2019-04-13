import { EventEmitter } from "events";
import fs from "fs";
import path from "path";

import cache from "./Cache";
import { Config } from "./Config";
import { Network } from "./components/network/Network";
import { PluginManager } from "./components/plugins/PluginManager";
import { User } from "./components/user/User";
import { Plugin } from "./components/plugins/Plugin";
import { object, array } from "joi";
import Post from "./plugins/post/post.plugin";
import { NodeBuilder } from "./NodeBuilder";

/**
 * Server instance
 */
class NodePress extends EventEmitter {

    private pluginManager!: PluginManager;
    private network: Network;
    private config!: Config;

    public get PluginManager(): PluginManager {
        return this.pluginManager;
    }

    constructor(args: string[]) {
        super();

        // Load configuration files
        this.fetchConfig(this.getArg('--config') || '../config.json');
        User.fetchConfig();

        // Set cache
        cache.set('dev_env', args.includes('--dev'));
        cache.set('root_path', __dirname);

        // Load modules
        this.pluginManager = new PluginManager();
        this.pluginManager.addPlugins([Post]);
        this.network = new Network(this.config.net, this);
        
        this.pluginManager.on('add_plugin', this.buildIndex.bind(this));

        // Initialise modules
        this.run();
        this.buildIndex();
    }

    public plugin(plugin: typeof Plugin | typeof Plugin[]) {
        if (Array.isArray(plugin)) {
            this.pluginManager.addPlugins(plugin);
            return;
        }

        this.pluginManager.addPlugin(plugin);
    }

    private getArg(arg: string): any {
        for (let i = 0; i < process.argv.length; i++) {
            if (!process.argv[i].startsWith(arg))
                continue;
            
            return process.argv.length > (i - 1) ? !process.argv[i + 1].startsWith('-') ? process.argv[i + 1] : true : true;
        }

        return null;
    }

    private fetchConfig(configPath: string) {
        if (typeof configPath != 'string')
            throw new Error('Config path not passed in arguments. Use --config');
        
        let absolutePath = path.join(__dirname, configPath);

        try {
            console.log(`Loading config from ${configPath}`)
            this.config = JSON.parse(fs.readFileSync(absolutePath).toString());
        } catch(e) {
            throw new Error(`Failed to load config file from "${configPath}"`);
        }

        cache.set('config_path', absolutePath);
    }

    private async run() {
        await this.network.listen(this.config.net);
        console.log(`This server instance is now running`);
    }

    private async buildIndex() {
        let inputPath = path.resolve(__dirname, 'pages/index.tsx');

        let page = await NodeBuilder.BuildPage(this.PluginManager.Plugins)
        cache.set('router_index', page);
    }
}

export { NodePress };
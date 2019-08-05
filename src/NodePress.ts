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
import { NodeBuilder } from "./NodeBuilder";
import { Database } from "./components/database/Database";
// Core plugins
import Post from "./plugins/post/post.plugin";
import Fetch from "./plugins/fetch/fetch.plugin";
import Feed from "./plugins/feed/feed.plugin";
import Reader from "./plugins/reader/reader.plugin";

/**
 * Server instance
 */
class NodePress extends EventEmitter {

    private database: Database;
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
        this.pluginManager.addPlugins([Post, Fetch, Feed, Reader]);
        this.network = new Network(this.config.net, this);
        this.database = new Database(this.config.db);
        
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
        await this.initialiseDatabase();
        await this.network.listen(this.config.net);
        console.log(`This server instance is now running`);
    }

    private async initialiseDatabase() {
        try {
            await this.database.connect();
            console.log(`database connection established`);
        } catch(e) {
            console.error(`could not connect to the database`, e);
        }
    }

    private async buildIndex() {
        let page = await NodeBuilder.BuildPage(this.PluginManager.Plugins)
        cache.set('router_index', page);
    }
}

export { NodePress };
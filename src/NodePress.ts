import { EventEmitter } from "events";
import fs from "fs";
import path from "path";

import cache from "./Cache";
import { Config, Arguments } from "./Config";
import { Network } from "./components/network/Network";
import { PluginManager } from "./components/plugins/PluginManager";
import { User } from "./plugins/user/User";
import { Plugin, PluginRoute } from "./components/plugins/Plugin";
import { object, array } from "joi";
import { NodeBuilder } from "./NodeBuilder";
import { Database } from "./components/database/Database";
import { Security } from "./components/crypto/Security";
import { Route } from "./components/router/Route";
import { RouteModel } from "./components/router/RouteModel";
import { Router } from "./components/router/Router";
// Core plugins
import Post from "./plugins/post/post.plugin";
import Fetch from "./plugins/fetch/fetch.plugin";
import Feed from "./plugins/feed/feed.plugin";
import Reader from "./plugins/reader/reader.plugin";
import UserPlugin from "./plugins/user/user.plugin";
import CacheKeys from "./CacheKeys";

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

    constructor(args: Arguments) {
        super();
        
        // Load configuration files
        this.fetchConfig(args.config);
        User.fetchConfig();

        // Set config.args.
        this.config.args = {
            ...args,
            // Set optional values to their default.
            dev: args.dev ?? false,
            ignoreCorePlugins: args.ignoreCorePlugins ?? false
        };
        
        // Set cache
        cache.set(CacheKeys.IS_DEV_ENV, this.config.args.dev);
        cache.set(CacheKeys.ROOT_PATH, __dirname);
        cache.set(CacheKeys.NP_EPOCH, this.config.api.np_epoch);

        // Load modules
        this.pluginManager = new PluginManager();

        this.pluginManager.addPlugins(this.config.args.plugins);

        if (!this.config.args.ignoreCorePlugins)
            this.pluginManager.addPlugins([Post, Fetch, Feed, Reader, UserPlugin]);
        
        // Add default components.
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

    private fetchConfig(configPath: string) {
        if (typeof configPath != 'string')
            throw new Error('Config path not passed in arguments. Use --config');
        
        console.log(`Loading config from ${configPath}`)
        this.config = JSON.parse(fs.readFileSync(configPath).toString());

        cache.set(CacheKeys.CONFIG_PATH, configPath);
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
        let page = await NodeBuilder.BuildPage(this.config.args.layout, this.PluginManager.Plugins);
        cache.set(CacheKeys.ROUTER_INDEX_SRC, page);
    }
}

export default NodePress;
module.exports = NodePress;

export { 
    NodePress,
    Config,
    Arguments,
    Plugin,
    PluginRoute,
    Database,
    Security,
    Route,
    RouteModel,
    Router
};
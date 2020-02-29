import { Plugin } from "./Plugin";
import { EventEmitter } from "events";
import Post from "../../plugins/post/post.plugin";

class PluginManager extends EventEmitter {

    private plugins: Plugin[] = [];

    public get Plugins(): Plugin[] {
        return this.plugins;
    }

    public addPlugin(plugin: (new () => Plugin)) {
        this.emit('add_plugin');
        this.initialisePlugin(plugin);
    }

    public addPlugins(plugins: (new () => Plugin)[]) {
        this.emit('add_plugin');
        plugins.forEach((plugin) => {
            this.initialisePlugin(plugin);
        });
    }

    private initialisePlugin(PluginType: new () => Plugin) {
        this.plugins.push(new PluginType());
    }
}

export { PluginManager }
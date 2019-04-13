import { Plugin } from "./Plugin";
import { EventEmitter } from "events";

class PluginManager extends EventEmitter {

    private plugins: Plugin[] = [];

    public get Plugins(): Plugin[] {
        return this.plugins;
    }

    public addPlugin(plugin: typeof Plugin) {
        this.emit('add_plugin');
        this.initialisePlugin(plugin);
    }

    public addPlugins(plugins: typeof Plugin[]) {
        this.emit('add_plugin');
        plugins.forEach((plugin) => {
            this.initialisePlugin(plugin);
        });
    }

    private initialisePlugin(PluginType: typeof Plugin) {
        this.plugins.push(new PluginType());
    }
}

export { PluginManager }
import { Plugin } from "./Plugin";

class PluginManager {

    private plugins: Plugin[] = [];

    public get Plugins(): Plugin[] {
        return this.plugins;
    }

    public addPlugin(plugin: typeof Plugin) {
        this.initialisePlugin(plugin);
    }

    public addPlugins(plugins: typeof Plugin[]) {
        plugins.forEach((plugin) => {
            this.initialisePlugin(plugin);
        });
    }

    private initialisePlugin(PluginType: typeof Plugin) {
        this.plugins.push(new PluginType());
    }
}

export { PluginManager }
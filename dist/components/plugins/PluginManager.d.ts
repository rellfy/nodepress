/// <reference types="node" />
import { Plugin } from "./Plugin";
import { EventEmitter } from "events";
declare class PluginManager extends EventEmitter {
    private plugins;
    get Plugins(): Plugin[];
    addPlugin(plugin: (new () => Plugin)): void;
    addPlugins(plugins: (new () => Plugin)[]): void;
    private initialisePlugin;
}
export { PluginManager };

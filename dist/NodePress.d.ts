/// <reference types="node" />
import { EventEmitter } from "events";
import { Config, Arguments } from "./Config";
import { PluginManager } from "./components/plugins/PluginManager";
import { Plugin } from "./components/plugins/Plugin";
/**
 * Server instance
 */
declare class NodePress extends EventEmitter {
    private database;
    private pluginManager;
    private network;
    private config;
    get PluginManager(): PluginManager;
    constructor(args: Arguments);
    plugin(plugin: typeof Plugin | typeof Plugin[]): void;
    private fetchConfig;
    private run;
    private initialiseDatabase;
    private buildIndex;
}
export { NodePress, Config, Arguments };
export default NodePress;

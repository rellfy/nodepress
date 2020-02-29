/// <reference types="node" />
import { EventEmitter } from "events";
import { Config, Arguments } from "./Config";
import { PluginManager } from "./components/plugins/PluginManager";
import { Plugin, PluginRoute } from "./components/plugins/Plugin";
import { Database } from "./components/database/Database";
import { Security } from "./components/crypto/Security";
import { Route } from "./components/router/Route";
import { RouteModel } from "./components/router/RouteModel";
import { Router } from "./components/router/Router";
import { IndexRoute } from "./components/router/IndexRoute";
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
    plugin(plugin: (new () => Plugin) | (new () => Plugin)[]): void;
    private fetchConfig;
    private run;
    private initialiseDatabase;
    private buildIndex;
}
export default NodePress;
export { NodePress, Config, Arguments, Plugin, PluginRoute, Database, Security, Route, IndexRoute, RouteModel, Router };

import { Route } from "../router/Route";
import { Router } from "../router/Router";
import * as React from 'react';

interface PluginRoute {
    server: Route;
    client?: string;
}

abstract class Plugin {

    public abstract routes: PluginRoute[];
}

export { Plugin, PluginRoute };
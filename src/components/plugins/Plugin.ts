import { Route } from "../router/Route";
import { Router } from "../router/Router";
import * as React from 'react';

interface PluginRoute {
    server: typeof Route;
    client?: string;
}

class Plugin {

    constructor() {

    }

    public static load(path: string) {
        
    }
    
    public routes(): PluginRoute[] {
        return [ ];
    }
}

export { Plugin, PluginRoute };
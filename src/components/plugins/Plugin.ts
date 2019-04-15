import { Route } from "../router/Route";
import { Router } from "../router/Router";
import * as React from 'react';

interface IPluginRoute {
    server: typeof Route;
    client?: string;
}

class Plugin {

    constructor() {

    }

    public static load(path: string) {
        
    }
    
    public routes(): IPluginRoute[] {
        return [ ];
    }
}

export { Plugin, IPluginRoute };
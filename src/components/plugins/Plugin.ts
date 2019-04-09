import { Route } from "../router/Route";
import { Router } from "../router/Router";
import * as React from 'react';

interface IPluginRoute {
    server: typeof Route | typeof Route[];
    client?: React.ReactElement<Route>;
}

class Plugin {

    constructor() {

    }

    public static load(path: string) {
        
    }

    public route(): IPluginRoute {
        return {
            server: []
        };
    }
}

export { Plugin, IPluginRoute };
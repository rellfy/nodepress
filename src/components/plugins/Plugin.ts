import { Route } from "../router/Route";
import * as React from 'react';

interface IPluginRoute {
    server: typeof Route | typeof Route[];
    client?: typeof React.Component;
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
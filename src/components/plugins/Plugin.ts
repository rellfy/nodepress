import { Route } from "../network/router/NetRoute";

class Plugin {

    constructor() {

    }

    public static load(path: string) {
        
    }

    public route(): typeof Route | typeof Route[] {
        return [];
    }
}

export { Plugin };
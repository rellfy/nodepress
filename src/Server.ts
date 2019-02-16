import { EventEmitter } from "events";
import fs from "fs";
import path from "path";

import cache from "./Cache";
import { Config } from "./Config";
import { Network } from "./components/network/Network";

/**
 * Server instance
 */
class Server extends EventEmitter {

    private network: Network;
    private config!: Config;

    constructor(args: string[]) {
        super();

        // Load configuration files
        this.fetchConfig(this.getArg('--config') || '../config.json');

        // Set cache
        cache.set('dev_env', args.includes('--dev'));

        // Load modules
        this.network = new Network(this.config.net, this);
        
        // Initialise modules
        this.run();
    }

    private getArg(arg: string): any {
        for (let i = 0; i < process.argv.length; i++) {
            if (!process.argv[i].startsWith(arg))
                continue;
            
            return process.argv.length > (i - 1) ? !process.argv[i + 1].startsWith('-') ? process.argv[i + 1] : true : true;
        }

        return null;
    }

    private fetchConfig(configPath: string) {
        if (typeof configPath != 'string')
            throw new Error('Config path not passed in arguments. Use --config');
        
        let absolutePath = path.join(__dirname, configPath);

        try {
            console.log(`Loading config from ${configPath}`)
            this.config = JSON.parse(fs.readFileSync(absolutePath).toString());
        } catch(e) {
            throw new Error(`Failed to load config file from "${configPath}"`);
        }

        cache.set('config_path', absolutePath);
    }

    private async run() {
        await this.network.listen(this.config.net);
        console.log(`This server instance is now running`);
    }
}

export { Server };
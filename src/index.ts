import { NodePress, Arguments } from './NodePress';

const isDevEnv = process.argv.includes('--dev');
const config: Arguments = {
    dev: isDevEnv,
    plugins: [],
    ignoreCorePlugins: false
};

const instance = new NodePress(config);
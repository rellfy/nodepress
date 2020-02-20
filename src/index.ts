import { NodePress } from './NodePress';
import request from 'request';
import { Arguments } from './Config';

const isDevEnv = process.argv.includes('--dev');
const config: Arguments = {
    dev: isDevEnv,
    plugins: [],
    ignoreCorePlugins: false
};

const instance = new NodePress(config);
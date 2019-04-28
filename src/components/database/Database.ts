import Mongoose from 'mongoose';
import { UserModel } from '../user/UserModel';

class Database {

    private connection!: Mongoose.Connection;
    private config: DbConfig;

    public get Connection(): Mongoose.Connection {
        return this.connection;
    }

    constructor(config: DbConfig) {
        this.config = config;
    }

    public async connect() {
        // this.connection = await Mongoose.createConnection(this.uri, this.options);
        await Mongoose.connect(this.config.uri, this.config.options);
    }

    public async disconnect() {
        await Mongoose.disconnect();
    }
}

export interface DbConfig {
    uri: string,
    options: any
}

export { Database };
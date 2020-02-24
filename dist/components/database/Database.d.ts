import Mongoose from 'mongoose';
declare class Database {
    private connection;
    private config;
    get Connection(): Mongoose.Connection;
    constructor(config: DbConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
export interface DbConfig {
    uri: string;
    options: any;
}
export { Database };

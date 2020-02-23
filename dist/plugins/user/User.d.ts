import { IUser, IUserDocument } from "./UserModel";
import Mongoose from "mongoose";
/**
 * The User class is the requester of a Client, which communicates to the
 * MPU instance.
 */
declare class User implements IUser {
    _id: Mongoose.Types.ObjectId;
    token?: string;
    username?: string;
    password?: string;
    salt?: string;
    cached: boolean;
    static config: UserConfig;
    constructor(options: {
        _id?: Mongoose.Types.ObjectId;
        token?: string;
        document?: IUserDocument;
    });
    static generateToken(rawPayload: any, date?: Date): string;
    static checkToken(token: string): boolean;
    /**
     * Find user ID by token and return an instance
     * @param token User's token
     */
    static Find(token: string, options: {
        ignoreCache: boolean;
    }): Promise<User>;
    static register(input: {
        username: string;
        email?: string;
        rawPassword: string;
    }): Promise<User>;
    static login(input: {
        username: string;
        rawPassword: string;
    }): Promise<User>;
    /**
     * Fetch user configutation data from cache or set cache if not set
     */
    static fetchConfig(): void;
}
export interface UserConfig {
    root: {
        password: string;
    };
    secret: {
        key: string;
    };
}
export { User };

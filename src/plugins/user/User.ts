import { UserModel, IUser, IUserDocument } from "./UserModel";
import Mongoose, { model } from "mongoose";
import { Security } from "../../components/crypto/Security";
import fs from 'fs';
import cache from "../../Cache";
import { Config } from "../../Config";
import { reject } from "bluebird";
import Boom from 'boom';
import CacheKeys from "../../CacheKeys";

/**
 * The User class is the requester of a Client, which communicates to the
 * MPU instance.
 */
class User implements IUser {

    public _id!: Mongoose.Types.ObjectId;
    public token?: string;
    public username?: string;
    public password?: string;
    public salt?: string;

    public cached: boolean = false;

    public static config: UserConfig;

    constructor(options: { _id?: Mongoose.Types.ObjectId, token?: string, document?: IUserDocument }) {
        if (options == null)
            return;

        if (options._id && options.token) {
            this._id = options._id;
            this.token = options.token;
            return;
        }

        if (options.document) {
            this._id = options.document._id;
            this.token = options.document.token;
            this.username = options.document.username;
            this.password = options.document.credentials ? options.document.credentials.password : undefined;
            this.salt = options.document.credentials ? options.document.credentials.salt : undefined;
        }
    }
   
    static generateToken(rawPayload: any, date?: Date) {
        const NP_EPOCH = cache.get(CacheKeys.NP_EPOCH);
        const rawDelta = (date ? date.getTime() : Date.now()) - NP_EPOCH;
        
        const payload = Security.encodeBase64(rawPayload);
        const delta = Security.encodeBase64Number(rawDelta);

        const signature = Security.HMAC({ payload, delta }, User.config.secret.key);

        return `${payload}.${delta}.${signature}`;
    }

    static checkToken(token: string): boolean {
        // Format:
        // {payload}.{deltatime}.{signature}

        const sections: string[] = token.split('.');
        const base64Regex: RegExp = /^[A-Za-z0-9-_]{2,}$/;

        if (sections.length != 3)
            return false;

        for (let i = 0; i < sections.length; i++) {
            if (!base64Regex.test(sections[i]) || sections[i] == '')
                return false;
        }

        const NP_EPOCH = cache.get(CacheKeys.NP_EPOCH);

        const payload = Security.decodeBase64(sections[0]);
        const date = Security.decodeBase64Number(sections[1]) + NP_EPOCH;
        const signature = sections[2];
        
        const match = User.generateToken(payload, date) === token;

        // console.log('========= DECODING TOKEN =========');
        // console.log('Payload: ', payload);
        // console.log('Date: ', date);
        // console.log('Signature: ', signature);
        // console.log('Match?: ', match);
        // console.log('========= DECODING TOKEN =========');
        
        return match;
    }

    /**
     * Find user ID by token and return an instance
     * @param token User's token
     */
    static async Find(token: string, options: { ignoreCache: boolean }): Promise<User> {
        const cachedID = cache.get(token);

        if (cachedID != null && !options.ignoreCache)
            return new User({ _id: new Mongoose.Types.ObjectId(cachedID), token });

        const user: IUser = {
            token
        };
        
        const userDocument: IUserDocument | null = await UserModel.findOne(user);

        if (userDocument == null)
            throw new Error('User not found');

        return new User({ document: userDocument });
    }

    static async register(input: { username: string, email?: string, rawPassword: string }): Promise<User> {

        const encrypted: { salt: string, password: string } = await Security.encryptPassword(input.rawPassword);
        
        const objectId = new Mongoose.Types.ObjectId();
        const token = this.generateToken(objectId.toHexString());

        const user: IUser = {
            _id: objectId,
            username: input.username,
            role: 'user',
            token,
            email: input.email ? {
                address: input.email
            } : undefined,
            credentials: encrypted
        };

        const document: IUserDocument = await UserModel.create(user);
        
        console.log(`Registered user ${user.username}`);
        return new User(document);
    }
    
    public static async login(input: { username: string, rawPassword: string }): Promise<User> {
        let query = {
            username: new RegExp('^' + input.username + '$', 'i')
        };
        
        const user: IUserDocument | null = await UserModel.findOne(query);
        
        if (user == null)
            throw Boom.unauthorized('User not found');
        
        if (!user.credentials)
            throw Boom.internal('Credentials are not set for this account');
        
        const encrypted = await Security.encryptPassword(input.rawPassword, user.credentials.salt);
        
        if (user.credentials.password != encrypted.password)
            throw Boom.unauthorized('Invalid password');
        
        console.log(`"${user.username}" logged in`);
        return new User({ document: user });
    }

    /**
     * Fetch user configutation data from cache or set cache if not set
     */
    public static fetchConfig() {
        if (User.config != null)
            return;

        let config: Config;

        try {
            const path = cache.get(CacheKeys.CONFIG_PATH);
            config = JSON.parse(fs.readFileSync(path).toString());
        } catch(e) {
            throw e;
        }

        User.config = config.user;
    }
}

export interface UserConfig {
    root: {
        password: string
    }
    secret: {
        key: string
    }
}

export { User };
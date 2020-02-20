import Mongoose from "mongoose";
import { User } from "./User";
import { Security } from "../../components/crypto/Security";
import cache from "../../Cache";
import Boom from "boom";
import CacheKeys from "../../CacheKeys";

/**
 * Implements a controller for the user authentication Token
 */
class Token {

    public encoded: string;
    public date: Date;

    /**
     * 
     * @param input Value containing either the encoded Token string or
     * an object with the raw payload and date object
     */
    constructor(input: string | { payload: string, date: Date }, isDeltaDate?: boolean) {
        switch(typeof input) {
            case "string":
                // Initialise Token from encoded string.
                this.encoded = input;

                const token: IToken | null = Token.getSections(this.encoded);

                if (token == null)
                    throw Boom.badRequest('Invalid encoded token string');
                
                this.date = token.date;
                break;
            case "object":
                // Initialise Token from payload/date object.
                this.date = input.date;

                const NP_EPOCH = cache.get(CacheKeys.NP_EPOCH);
                const delta = isDeltaDate ? this.date.getTime() : this.date.getTime() - NP_EPOCH;
                
                const payload = Security.encodeBase64(input.payload);
                const deltaEncoded = Security.encodeBase64Number(delta);
        
                const signature = Security.HMAC({ payload, delta }, User.config.secret.key);

                this.encoded = `${payload}.${deltaEncoded}.${signature}`;
                break;
            default:
                throw new Error('Initialised Token with no arguments');
        }
    }

    public static getSections(encoded: string): IToken | null {
        // Token structure:
        // {payload}.{deltatime}.{signature}
        if (typeof encoded !== 'string')
            return null;

        if (encoded.length < 5)
            return null;

        const sections: string[] = encoded.split('.');
        const base64Regex: RegExp = /^[A-Za-z0-9-_]{1,}$/;

        if (sections.length != 3)
            return null;

        for (let i = 0; i < sections.length; i++) {
            if (!base64Regex.test(sections[i]) || sections[i] == '')
                return null;
        }

        const NP_EPOCH: number = cache.get(CacheKeys.NP_EPOCH);

        const payload = Security.decodeBase64(sections[0]);
        const date = new Date(Security.decodeBase64Number(sections[1]) + NP_EPOCH);
        const signature = sections[2];
        
        // Ensure token is valid before returning sections.
        const match = new Token({ payload, date }).encoded === encoded;

        if (!match)
            return null;

        return { payload, date, signature };
    }

    public static validate(encoded: string): boolean {
        return Token.getSections(encoded) !== null;
    }

    public getDate(): Date | undefined {
        const token = Token.getSections(this.encoded);

        if (token == null)
            return;

        return token.date;
    }
}

export interface IToken {
    encoded?: string,
    payload: string,
    date: Date,
    signature: string
}

export { Token };
import Crypto from 'crypto';
import { object } from 'joi';

const ITERATIONS = 50000;
const BYTES = 64;
const DIGEST = 'base64';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

class Security {

    public static async encryptPassword(raw: string, salt?: string) {
        salt = salt || Security.generateSalt(BYTES);

        const password: string = await Security.hashPBKDF2(raw, salt);
        
        return { salt, password };
    }
    
    public static parseBase64(code: string): string {
        return code.replace(/=/g, '')
                   .replace(/\+/g, '-')
                   .replace(/\//g, '_');
    }

    public static reverseParseBase64(code: string) {
        return code.replace(/\-/g, '+')
                   .replace(/\_/g, '/');
    }

    public static encodeBase64(input: any) {
        let value: string = input;

        if (typeof value == 'object')
            value = JSON.stringify(value);

        let base64 = Buffer.from(value).toString('base64');
        return Security.parseBase64(base64);
    }

    public static decodeBase64(value: string) {
        return Buffer.from(Security.reverseParseBase64(value), 'base64').toString();
    }

    public static encodeBase64Number(value: number): string {
        let result = '';
        let mod;

        do {
            mod = value % 64;
            result = ALPHABET.charAt(mod) + result;
            value = Math.floor(value / 64);
        } while (value > 0);

        return result;
    }

    public static decodeBase64Number(value: string): number {
        let result = 0;

        for (let i = 0, len = value.length; i < len; i++) {
            result *= 64;
            result += ALPHABET.indexOf(value[i]);
        }

        return result;
    }

	public static hashPBKDF2(secret: string, salt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            Crypto.pbkdf2(secret, salt, ITERATIONS, BYTES, 'sha512', (error: any, key: Buffer | string) => {
                if (error) {
                    reject(error);
                    return;
                }

                let result = key.toString(DIGEST);

                if (DIGEST == 'base64')
                    result = Security.parseBase64(result);

                resolve(result);
            });
        });
    }

	public static generateSalt(bytes: number) {
        let salt = Crypto.randomBytes(bytes).toString(DIGEST);
        
        if (DIGEST == 'base64')
            salt = Security.parseBase64(salt);

        return salt;
    }
    
    public static HMAC(payload: any, secret: string) {
        let hashed = Crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest(DIGEST);

        if (DIGEST == 'base64')
            hashed = Security.parseBase64(hashed);

        return hashed;
    }
}

export { Security };
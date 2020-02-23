declare class Security {
    static encryptPassword(raw: string, salt?: string): Promise<{
        salt: string;
        password: string;
    }>;
    static parseBase64(code: string): string;
    static reverseParseBase64(code: string): string;
    static encodeBase64(input: any): string;
    static decodeBase64(value: string): string;
    static encodeBase64Number(value: number): string;
    static decodeBase64Number(value: string): number;
    static hashPBKDF2(secret: string, salt: string): Promise<string>;
    static generateSalt(bytes: number): string;
    static HMAC(payload: any, secret: string): string;
}
export { Security };

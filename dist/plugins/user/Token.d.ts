/**
 * Implements a controller for the user authentication Token
 */
declare class Token {
    encoded: string;
    date: Date;
    /**
     *
     * @param input Value containing either the encoded Token string or
     * an object with the raw payload and date object
     */
    constructor(input: string | {
        payload: string;
        date: Date;
    }, isDeltaDate?: boolean);
    static getSections(encoded: string): IToken | null;
    static validate(encoded: string): boolean;
    getDate(): Date | undefined;
}
export interface IToken {
    encoded?: string;
    payload: string;
    date: Date;
    signature: string;
}
export { Token };

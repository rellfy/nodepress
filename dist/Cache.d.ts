declare class Cache {
    private storage;
    set(key: string, value: any): void;
    get(key: string): any;
}
declare const cache: Cache;
export default cache;

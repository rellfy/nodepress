
class Cache {

    private storage: any = { };

    set(key: string, value: any) {
        this.storage[key] = value;
    }

    get(key: string) {
        return this.storage[key]; 
    }
}

const cache = new Cache();

export default cache;
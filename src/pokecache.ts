export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;
    
    constructor(num: number) {
        this.#interval = num;
        this.#startReapLoop()
    } 

    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const retrieval = this.#cache.get(key) as CacheEntry<T> | undefined
        if (retrieval) {
            return retrieval.val;
        }
        return undefined;
    }

    #reap(): void {
        this.#cache.forEach((entry, key) => {
            const age = Date.now() - entry.createdAt;
            if (age > this.#interval) {
                this.#cache.delete(key);
            }
        })
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }

    stopReapLoop():void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    


}

export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(num) {
        this.#interval = num;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const retrieval = this.#cache.get(key);
        if (retrieval) {
            return retrieval.val;
        }
        return undefined;
    }
    #reap() {
        this.#cache.forEach((entry, key) => {
            const age = Date.now() - entry.createdAt;
            if (age > this.#interval) {
                this.#cache.delete(key);
            }
        });
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}

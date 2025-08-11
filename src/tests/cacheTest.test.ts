import { describe, test, expect } from 'vitest'
import { Cache } from 'src/pokecache.js'

// The two tests marked with concurrent will be run in parallel
describe('Cache Class', () => {
    test('Should add and retrieve cached data', () => {
        const cache = new Cache(1000);
        const key = 'testKey';
        const value = { name: "Squirtle" };

        cache.add(key, value);
        const cachedValue = cache.get<typeof value>(key);

        expect(cachedValue).toEqual(value);
    });
    
    test('Should remove expired entries', async () => {
        const cache = new Cache(100);
        const key = "testKey";
        const value = { name: "pikachu" };

        cache.add(key, value);

        await new Promise((resolve) => setTimeout(resolve,2000));

        const cachedValue = cache.get<typeof value>(key);
        expect(cachedValue).toBeUndefined();
    });

    test.concurrent.each([
        ['key1', { name: "Bulbasaur" }],
        ['key2', {name: "Charmander" }],
        ['key3', { name: "Squirtle" }],
    ])("Should handle concurrent access for key %s", async (key, value) => {
        const cache = new Cache(1000);

        cache.add(key, value);
        const cachedValue = cache.get<typeof value>(key);

        expect(cachedValue).toEqual(value);
    })
})
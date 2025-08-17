import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    mapData = new Cache(6000);
    constructor() { }
    async fetchPokemon(name) {
        const url = `${PokeAPI.baseURL}/pokemon/${name}`;
        const cachedData = this.mapData.get(url);
        if (cachedData) {
            return cachedData;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to find: ${response.status} `);
            }
            const data = await response.json();
            this.mapData.add(url, data);
            return data;
        }
        catch (error) {
            console.error("Error in fetchPokemon:", error);
            throw error;
        }
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cachedData = this.mapData.get(url);
        if (cachedData) {
            return cachedData;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch locations from ${url}: ${response.status}`);
            }
            const data = await response.json();
            this.mapData.add(url, data);
            return data;
        }
        catch (error) {
            console.error("Error in fetchLocations:", error);
            throw error;
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        // console.log(`DEBUG: Fetching URL: ${url}`); 
        const cachedData = this.mapData.get(url);
        if (cachedData) {
            console.log(`Cached Data has been found: ${locationName}`);
            return cachedData;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch location: ${response.status}`);
            }
            const data = await response.json();
            this.mapData.add(url, data);
            return data;
        }
        catch (err) {
            console.error("Error in fetchLocation:", err);
            throw err;
        }
    }
}

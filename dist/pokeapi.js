import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    mapData = new Cache(6000);
    constructor() { }
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
        catch (err) {
            console.error("Error in fetchLocations:", err);
            throw err;
        }
    }
    async fetchLocation(locationName) {
        try {
            const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch location: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.error("Error in fetchLocation:", err);
            throw err;
        }
    }
}

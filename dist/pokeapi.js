export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        try {
            const url = pageURL || `${PokeAPI.baseURL}/location-area`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch locations: ${response.status}`);
            }
            const data = await response.json();
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
const myTest = new PokeAPI;
myTest.fetchLocations(); // without pageURL;
myTest.fetchLocations("next");

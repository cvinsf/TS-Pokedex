export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        try {
            const url = pageURL || `${PokeAPI.baseURL}/location-area`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch locations: ${response.status}`);
            }

            const data: ShallowLocations = await response.json();
            return data;
        } catch (err) {
            console.error("Error in fetchLocations:", err);
            throw err;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        try {
            const url = `${PokeAPI.baseURL}/location-area/${locationName}`
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch location: ${response.status}`);
            }

            const data: Location = await response.json();
            return data;


        } catch (err) {
            console.error("Error in fetchLocation:", err);
            throw err;
        }

    }
}

export type ShallowLocations = {
    results: { name: string; url: string }[];
    next: string | null;
    previous: string | null;
}

export type Location = {
    id: number;
    name: string;
    region: { name: string; url: string };
    names: { name: string; language: { name: string; url: string } }[];
};

const myTest = new PokeAPI();

async function testFetchLocations() {
    console.log("Fetching first batch of locations...");
    const locations = await myTest.fetchLocations(); // Fetch without pageURL
    console.log(locations);

    if (locations.next) {
        console.log("Fetching next batch of locations...");
        const nextLocations = await myTest.fetchLocations(locations.next); // Fetch with next URL
        console.log(nextLocations);
    }
}

(async () => {
    await testFetchLocations();
})();
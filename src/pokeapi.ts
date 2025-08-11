import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private mapData = new Cache(6000);

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const url = pageURL || `${PokeAPI.baseURL}/location-area`;

      const cachedData = this.mapData.get<ShallowLocations>(url);

      if (cachedData) {
        return cachedData;
      }

        try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`Failed to fetch locations from ${url}: ${response.status}`);            }

            const data: ShallowLocations = await response.json();

            this.mapData.add(url, data)
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
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
}

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};




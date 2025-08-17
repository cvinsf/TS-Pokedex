import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private mapData = new Cache(6000);

    constructor() {}

    async fetchPokemon(name: string): Promise<CapturedPokemon> {
      const url = `${PokeAPI.baseURL}/pokemon/${name}`

      const cachedData = this.mapData.get<CapturedPokemon>(url);
      if (cachedData) {
        return cachedData;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to find: ${response.status} `)
        }

        const data = await response.json()
        this.mapData.add(url, data);

        return data;

      } catch(error) {
        console.error("Error in fetchPokemon:", error);
            throw error;

      }

    }


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

        } catch (error) {
            console.error("Error in fetchLocations:", error);
            throw error;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`
      // console.log(`DEBUG: Fetching URL: ${url}`); 


      const cachedData = this.mapData.get<Location>(url);
      if (cachedData) {
        console.log(`Cached Data has been found: ${locationName}`);
        return cachedData;
      }
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch location: ${response.status}`);
            }

            const data: Location = await response.json();
            this.mapData.add(url, data);

            return data;


        } catch (err) {
            console.error("Error in fetchLocation:", err);
            throw err;
        }

    }
}


export type CapturedPokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};


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




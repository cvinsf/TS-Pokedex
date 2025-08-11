import { createInterface } from "readline";
import { getCommands } from "./command-registry/commands.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    const newPokedex = new PokeAPI;
    const nextLocationsURL = null;
    const prevLocationsURL = null;
    return {
        readline: rl,
        commands: getCommands(),
        api: newPokedex,
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL,
    };
}

import { createInterface, type Interface } from "readline";
import { getCommands } from "./command-registry/commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}


export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    })
    const newPokedex = new PokeAPI;
    const nextLocationsURL = null;
    const prevLocationsURL = null;

    return {
        readline: rl,
        commands: getCommands(),
        api: newPokedex,
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL,

    }
}

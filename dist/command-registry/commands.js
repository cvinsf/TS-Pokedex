import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { callMap, mapBack } from "./command_map.js";
export function getCommands() {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Displays 20 location areas at a time. Calling multiple times lists different areas.",
            callback: callMap,
        },
        mapb: {
            name: "mapb",
            description: "Display the previous 20 locations after having called map.",
            callback: mapBack,
        },
        explore: {
            name: "explore",
            description: "Explore a named area the user requested. Returns all Pokemon in that area.",
            callback: async (state) => {
                console.log("Usage: explore <location-name>");
                console.log("Example: explore canalave-city-area");
            }
        },
        catch: {
            name: "catch",
            description: "Throw a pokeball and attempt to catch a pokemon!",
            callback: async (state) => {
                console.log("Usage: catch <pokemon> --> simulates catching a pokemon");
                console.log("Example: catch pikachu");
            }
        },
        inspect: {
            name: "inspect",
            description: "Inspects a pokemon that has been caught.",
            callback: async (state) => {
                console.log("Usage: inspect <pokemon>");
                console.log("Example: inspect pikachu");
            }
        },
        pokedex: {
            name: "pokedex",
            description: "Shows all pokemon user has captured.",
            callback: async (state) => {
                console.log("Usage: pokedex");
            }
        }
    };
}

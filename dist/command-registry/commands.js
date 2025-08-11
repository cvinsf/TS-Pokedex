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
        }
    };
}

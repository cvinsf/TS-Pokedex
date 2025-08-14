import type { CLICommand } from "src/state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { callMap, mapBack } from "./command_map.js"
import { exploreMap } from "./command_explore.js";
import type { State } from "src/state.js";

export function getCommands(): Record<string, CLICommand> {
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
      callback: async (state: State) => {
    console.log("Usage: explore <location-name>");
    console.log("Example: explore canalave-city-area");
      }
    }
  }
}
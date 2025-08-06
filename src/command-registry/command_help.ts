import { CLICommand } from "../types.js";
import { getCommands } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    const allCommands = getCommands();

    console.log("Welcome to the Pokedex!")
    console.log(`Usage: \n
        help: ${allCommands["help"].description}\n
        exit: ${allCommands["exit"].description}
        `)
}
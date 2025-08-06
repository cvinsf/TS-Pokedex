import { commandExit } from "./command_exit";
import { commandHelp } from "./command_help";
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
        // can add more commands here
    };
}

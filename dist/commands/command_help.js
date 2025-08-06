import { getCommands } from "./commands";
export function commandHelp(commands) {
    const allCommands = getCommands();
    console.log("Welcome to the Pokedex!");
    console.log(`Usage: \n
        help: ${allCommands["help"].description}\n
        exit: ${allCommands["exit"].description}
        `);
}

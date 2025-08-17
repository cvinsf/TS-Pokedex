import type { State } from './state.js';
import { exploreMap } from './command-registry/command_explore.js';
import { commandCatch } from './command-registry/command_catch.js';
import { commandInspect } from './command-registry/command_inspect.js';
import { commandPokedex } from './command-registry/command_pokedex.js';

export async function startREPL(state: State) {
    const { readline, commands, api, nextLocationsURL, prevLocationsURL } = state;
    readline.prompt();
    readline.on("line", async (input) => {
        if (!input) {
            readline.prompt();
            return;
        }
        const cleanedInput = cleanInput(input);
        const command = cleanedInput[0];

        if (commands.hasOwnProperty(command)) {
            try {
                if (command === "explore") {
                    const location = cleanedInput[1] || "";
                    await exploreMap(location, state);
                } else if (command === "catch") {
                    const pokemon = cleanedInput[1] || "";
                    await commandCatch(pokemon, state);
                } else if (command === "inspect") {
                    const pokemon = cleanedInput[1];
                     commandInspect(pokemon, state);
                } else if (command === "pokedex") {
                    commandPokedex(state);
                }
                else {
                    await commands[command].callback(state);
                }
            } catch (err) {
                console.error("Error:", err);
            }
        } else {
            console.log("Unknown command");
        }
        readline.prompt();
    });
}


export function cleanInput(input: string): string[] {
    const cleanWords = [];
    for (const word of input.split(/\s+/)) {
        const cleanWord = word.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
        cleanWords.push(cleanWord)
    }
    return cleanWords;
}


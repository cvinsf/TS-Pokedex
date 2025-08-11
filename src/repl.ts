import type { State } from './state.js';

export async function startREPL(state: State) {
    const { readline, commands, api, nextLocationsURL, prevLocationsURL } = state;
    readline.prompt();
    readline.on("line", async (input) => {
        if (!input) {
            readline.prompt();
            return;
        }
        const command = cleanInput(input)[0];

        if (commands.hasOwnProperty(command)) {
            try {
                await commands[command].callback(state);
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
        const cleanWord = word.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        cleanWords.push(cleanWord)
    }
    return cleanWords;
}


import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command-registry/commands";
import { cleanInput } from "./repl";
export function initState() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex >"
    });
    rl.prompt();
    rl.on("line", (input) => {
        if (!input) {
            rl.prompt();
            return;
        }
        const command = cleanInput(input)[0];
        const commands = getCommands();
        if (commands.hasOwnProperty(command)) {
            try {
                commands[command].callback(commands);
            }
            catch (err) {
                console.error("Error:", err);
            }
        }
        else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}

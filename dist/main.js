import { initState } from "./state.js";
import { startREPL } from "./repl.js";
function main() {
    const newState = initState();
    startREPL(newState);
}
main();

import { CLICommand } from "src/types"

export function commandExit(commands: Record<string, CLICommand>): void {
    console.log("Closing the Pokedex... Goodbye!")
    process.exit(0)

}
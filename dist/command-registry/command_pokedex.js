export function commandPokedex(state) {
    console.log("Your Pokedex: ");
    if (!state.caughtPokemon) {
        console.log("Your Pokedex is empty.");
    }
    for (let pokemon in state.caughtPokemon) {
        console.log(`  -${state.caughtPokemon[pokemon].name}`);
    }
}

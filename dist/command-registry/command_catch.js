export async function commandCatch(pokemon, state) {
    if (state.caughtPokemon[pokemon]) {
        console.log(`${pokemon} has already been caught!`);
        return;
    }
    try {
        const pokemonData = await state.api.fetchPokemon(pokemon);
        const caught = tryCatch(pokemonData.name, pokemonData.base_experience);
        if (caught) {
            state.caughtPokemon[pokemonData.name] = pokemonData;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Cannot find named pokemon, please try again", error.message);
        }
    }
}
function tryCatch(name, base_experience) {
    console.log(`Throwing a Pokeball at ${name}...`);
    let caught = Math.random() > base_experience / 900;
    if (caught) {
        console.log(`${name} was caught!`);
    }
    else {
        console.log(`${name} escaped!`);
    }
    return caught;
}

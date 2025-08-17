import type { State } from "../state.js"

export async function commandCatch(pokemon: string, state: State): Promise<void> {
    if (state.caughtPokemon[pokemon]) {
        console.log(`${pokemon} has already been caught!`);
        return;
    }

    try {
        const pokemonData = await state.api.fetchPokemon(pokemon);
        
        const caught = tryCatch(pokemonData.name, pokemonData.base_experience)
        if (caught) {
            state.caughtPokemon[pokemonData.name]  = pokemonData; 
        }


    } catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Cannot find named pokemon, please try again", error.message);
        }
    }

}

function tryCatch(name: string, base_experience: number): boolean {
    console.log(`Throwing a Pokeball at ${name}...`);

    let caught = Math.random()  > base_experience / 900 
    
    if (caught) {
        console.log(`${name} was caught!`)
    } else {
        console.log(`${name} escaped!`)
    }

    return caught;
}
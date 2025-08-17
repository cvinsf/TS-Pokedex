export function commandInspect(pokemonName, state) {
    if (state.caughtPokemon[pokemonName]) {
        // console.log(`${state.caughtPokemon[pokemonName].name} was captured.`);
        const { name, height, weight, stats, types } = state.caughtPokemon[pokemonName];
        console.log(`Name: ${name}`);
        console.log(`Height: ${height}`);
        console.log(`Weight: ${weight}`);
        console.log("Stats: ");
        getStats(state.caughtPokemon[pokemonName].stats);
        console.log("Types: ");
        getTypes(state.caughtPokemon[pokemonName].types);
    }
    else {
        console.log("you have not caught that pokemon");
        // console.log("Try to capture it!")
        return;
    }
}
function getStats(stats) {
    for (let stat of stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
}
function getTypes(types) {
    for (let type of types) {
        console.log(`  - ${type.type.name}`);
    }
}

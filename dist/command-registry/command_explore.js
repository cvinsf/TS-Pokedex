export async function exploreMap(location, state) {
    if (!location) {
        console.log("Please enter a location to explore...");
        return;
    }
    try {
        const locationData = await state.api.fetchLocation(location);
        const pokemonList = locationData.pokemon_encounters.map(encounter => encounter.pokemon.name);
        if (pokemonList.length === 0) {
            console.log(`No Pokemon found in ${location}`);
        }
        else {
            console.log(`Exploring ${location}...`);
            console.log("Found Pokemon: ");
            pokemonList.forEach(pokemon => console.log(`- ${pokemon}`));
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Issues fetching map location:", error.message);
        }
    }
}

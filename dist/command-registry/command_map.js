// Display 20 names of location areas, each subsequent call should show next 20 locations and so on.
export async function callMap(state) {
    if (!state.nextLocationsURL) {
        console.log("No more locations to display.");
        return;
    }
    try {
        const response = await fetch(state.nextLocationsURL);
        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.status}`);
        }
        const result = await response.json();
        const locations = result.results.map((location) => location.name);
        console.log("Next 20 Locations:");
        console.log(locations.join("\n"));
        // Update the state's pagination URLs
        state.nextLocationsURL = result.next;
        state.prevLocationsURL = result.previous;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching locations:", error.message);
        }
    }
}
export async function mapBack(state) {
    if (!state.prevLocationsURL) {
        console.log("No previous locations to display.");
        return;
    }
    try {
        const response = await fetch(state.prevLocationsURL);
        if (!response.ok) {
            throw new Error(`Failed to fetch previous locations: ${response.status}`);
        }
        const result = await response.json();
        const locations = result.results.map((location) => location.name);
        console.log("Previous 20 Locations:");
        console.log(locations.join("\n"));
        state.nextLocationsURL = result.next;
        state.prevLocationsURL = result.previous;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching previous locations", error.message);
        }
    }
}

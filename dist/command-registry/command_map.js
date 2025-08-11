// Display 20 names of location areas, each subsequent call should show next 20 locations and so on.
export async function callMap() {
    const url = 'https://pokeapi.co/api/v2/location-area';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

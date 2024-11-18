import { capitalize } from "../utils/formatter";

const numberOfRequests = 100;
const cacheKey = "pokemonDataCache";

async function api() {
  const pokemonData = [];
  const type = [];
  // Check if cached data exists
  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
    return cachedData;
  }

  try {
    // Fetch data if not cached
    for (let i = 1; i <= numberOfRequests; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      type.push({
        type:
          data.types.length > 1
            ? [
                capitalize(data.types[0].type.name) +
                  "/" +
                  capitalize(data.types[1].type.name),
              ]
            : [capitalize(data.types[0].type.name)],
      });
      pokemonData.push({
        id: i,
        name: data.name,
        img: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        p_id: data.id,
        type:
          data.types.length > 1
            ? [
                capitalize(data.types[0].type.name) +
                  "/" +
                  capitalize(data.types[1].type.name),
              ]
            : [capitalize(data.types[0].type.name)],
      });
    }

    // Cache the fetched data in localStorage
    localStorage.setItem(cacheKey, JSON.stringify(pokemonData));
    saveToJsonFile(type);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
}

function saveToJsonFile(data) {
  const json = JSON.stringify(data, null, 2); // Format JSON with indentation
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pokemonData.json"; // Set the file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Clean up URL
}

export { api };

import { capitalize } from "../utils/formatter";

const numberOfRequests = 20;
const cacheKey = "pokemonDataCache";

async function api() {
  const pokemonData = [];
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
    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
}

export { api };

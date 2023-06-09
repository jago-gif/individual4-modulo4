// Importar la variable `data` desde otro archivo JS (data.js)
import data from "./data.js";

// Función para buscar un Pokémon por ID
function getPokemonById(id, callback) {
  setTimeout(() => {
    const pokemon = data.find((p) => p.id === parseInt(id));
    if (pokemon) {
      callback(null, pokemon);
    } else {
      callback("No se encontró ningún Pokémon con ese ID", null);
    }
  }, 1000);
}

// Función para buscar un Pokémon por nombre
function getPokemonByName(name, callback) {
  setTimeout(() => {
    const pokemon = data.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (pokemon) {
      callback(null, pokemon);
    } else {
      callback("No se encontró ningún Pokémon con ese nombre", null);
    }
  }, 1000);
}

// Función para mostrar los resultados en el contenedor de resultados
function displayResult(result) {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";
  if (result) {
    const nameElement = document.createElement("h2");
    nameElement.textContent = " ID: " + result.id+" Nombre "+result.name;
    resultContainer.appendChild(nameElement);

    const typesElement = document.createElement("p");
    typesElement.textContent = "Tipos: " + result.types.join(", ");
    resultContainer.appendChild(typesElement);
  } else {
    const errorElement = document.createElement("p");
    errorElement.textContent = "No se encontró ningún Pokémon";
    resultContainer.appendChild(errorElement);
  }
}

// Obtener referencias a los elementos HTML
const searchButton = document.getElementById("search-button");
const pokemonInput = document.getElementById("pokemon-input");

// Manejar el evento click del botón de búsqueda
searchButton.addEventListener("click", () => {
  const searchTerm = pokemonInput.value.trim();

  // Verificar si el término de búsqueda es un número (ID) o una cadena (nombre)
  const searchIsNumber = /^\d+$/.test(searchTerm);
  const searchFunction = searchIsNumber ? getPokemonById : getPokemonByName;

  searchFunction(searchTerm, (error, result) => {
    displayResult(error ? null : result);
  });
});

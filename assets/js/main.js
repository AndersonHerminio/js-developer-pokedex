const pokemonList = document.getElementById('pokemonList');
pokemonList.addEventListener('click', handlePokemonClick);

const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

const convertPokemonToLi = pokemon => {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
};

function handlePokemonClick(event) {
    const clickedElement = event.target.closest('li');
  
    if (clickedElement) {
      const pokemonData = extractPokemonDataFromLi(clickedElement);
      openPokemonDetailsInNewTab(pokemonData);
    }
  };

function extractPokemonDataFromLi(pokemonLi) {
    console.log(pokemonLi, 'pokemonLi');
    const number = pokemonLi.querySelector('.number').textContent.slice(1);
    const name = pokemonLi.querySelector('.name').textContent;
    const photoUrl = pokemonLi.querySelector('img').src;

    return { number, name, photoUrl };
};

function openPokemonDetailsInNewTab(pokemonData) {
    const detailsUrl = `https://www.pokemon.com/us/pokedex/${pokemonData.number}`;
    window.open(detailsUrl, '_blank');
};

const loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    });
};

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit);
    }
});
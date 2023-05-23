import axios from 'axios';

const singlePokemonFetch = (id) => 
axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

export default singlePokemonFetch


import axios from 'axios';

const evolutionDataFetch = (id) => 
axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

const evolutionChainFetch = async(id) => {
    let results = await evolutionDataFetch(id)
    
    results = results.data.evolution_chain.url
    const evolutionChain = await axios.get(`${results}`)
        return evolutionChain.data.chain
}
export default evolutionChainFetch


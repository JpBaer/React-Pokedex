import axios from 'axios'

const fetchAbilityData = (ability) =>
    axios.get(`https://pokeapi.co/api/v2/ability/${ability}`)

export default fetchAbilityData
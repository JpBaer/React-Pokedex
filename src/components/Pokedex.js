import React, {useState, useEffect} from 'react';
import Pokecard from './Pokecard'
import './Pokedex.css'
import pokemonSearch from '../utils/pokemonAPI'

//Eventully will import an object here of all the pokemon data from django
//for now use placeholder object from tutorial

// let pokemon = [
//     {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
//     {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
//     {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
//     {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178},
//     {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
//     {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
//     {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
//     {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
//   ];


//Defining Pokedex component
const Pokedex = () => {
    const [results, setResults] = useState([]);
  //making api call to pokemon API
  const pokemonList = async() => {
    const response = await(pokemonSearch())
    // console.log(response.data.results)
     setResults(response.data.results.splice(0,1008))
   
   };

   //Will run API call once when page is first loaded
   useEffect(() => {
    pokemonList()
   },[])

   console.log(results)
    return(

    <div className = "Pokedex">
    <div className = "Pokedex-cards">   
    {results.map((pokemon, index) => {
      return <Pokecard  id={index + 1} pokename={pokemon.name} key = {index+1}/>
    })}
    </div>  
    </div>
    )
} 

export default Pokedex
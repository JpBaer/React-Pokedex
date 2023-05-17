import React, {useState, useEffect} from 'react';
import './Pokecard.css'
import singlePokemonFetch from '../utils/singlePokemonAPI';


export default function Pokecard(props){
        //Set state variables
        const [pokemonData ,setPokemonData] = useState({});

        //destructure props
        const {id, pokename} = props;
        const imgId = makeIndexThreeCharacters(id);

        //Call pokemon data for card
        const fetchPokemonData = async(id) => {
                const result = await singlePokemonFetch(id)
                setPokemonData({
                        types: result.data.types,
                        abilities: result.data.abilities,
                })
             
        };

        // populate pokemon data for each card generated
        useEffect(() => {
                fetchPokemonData(id)
        },[id])

        useEffect(() => {
                console.log(pokemonData);
        }, [pokemonData]);
                

        
        
return(
        <div className = "Pokecard">
            <img src = {`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`} alt = "Pokemon" className = "Pokecard-image"/>;
            <div className = "Pokecard-title">{pokename}</div>
            <div className = "Pokecard-data">#{id}</div>
            {/* <div className = "Pokecard-data">Type: {type}</div> */}

        </div>
)
}


function makeIndexThreeCharacters(index) {
    let indexString = index.toString();
    while (indexString.length < 3) {
      indexString = '0' + indexString;
    }
    return indexString;
  }
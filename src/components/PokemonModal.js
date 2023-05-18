import React, {useState} from 'react'
import singlePokemonFetch from '../utils/singlePokemonAPI';
import './PokemonModal.css' 


const PokemonModal = (props) => {
 
  console.log('Modal rendered')
  console.log(props.name)

  const imgId = makeIndexThreeCharacters(props.id);

  const handleClose = () => {
    props.onClose()
  }
  
  return (
    
    <div>
        <div className = "modal">
        <div className = "overlay"></div>
          <div className = "modal-content">

        <header>
        <h1>{props.name}</h1>
        <p>#{props.id}</p>
        </header>

        <div className='pokemonData'>
        <img src = {`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`} alt = "Pokemon" className = "Pokecard-image"/>
        </div>

        <button onClick = {handleClose}>
          <p>Close</p>
        </button>
        </div>
        </div>
  
    </div>
    
  )
}

export default PokemonModal

function makeIndexThreeCharacters(index) {
  let indexString = index.toString();
  while (indexString.length < 3) {
    indexString = '0' + indexString;
  }
  return indexString;
}
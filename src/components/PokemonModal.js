import React, {useState, useEffect} from 'react'
import singlePokemonFetch from '../utils/singlePokemonAPI';
import './PokemonModal.css' 
import evolutionChainFetch from '../utils/evolutionDataAPI';
import fetchAbilityData from '../utils/abilityDataAPI';
import InfoBlock from './InfoBlock';
import ImageBlock from './ImageBlock';
import MovesBlock from './MovesBlock';

const PokemonModal = (props) => {
 
  const[pokemonData, setPokemonData] = useState(null)
  const[abilityInfo, setAbilityInfo] = useState(null)
  const[evolutionData, setEvolutionData] = useState(null)
 

  const imgId = makeIndexThreeCharacters(props.id);

  const fetchPokemonData = async(id) => {
    const result = await singlePokemonFetch(id)
    console.log(result.data)
    let data = {
      types: result.data.types,
      abilities: result.data.abilities,
      //cm
      height: result.data.height * 10,
      //kg
      weight: result.data.weight/10,
      stats: result.data.stats,
      moves: result.data.moves
    }
    console.log(data.abilities[0].ability.name)
    setPokemonData(data)
 
};

  const fetchEvolution = async(id) => {
    const result = await evolutionChainFetch(id)
    console.log('evolution chain result')
    console.log(result)
    setEvolutionData(result.data)
  }

  const fetchAbility = async() => {
      const result = await fetchAbilityData(pokemonData.abilities[0].ability.name)
      if(result.data.effect_entries[0].language.name === 'en'){
      setAbilityInfo(result.data.effect_entries[0].effect)}
      else{
        setAbilityInfo(result.data.effect_entries[1].effect)
      }
  }

  // populate pokemon data for each card generated
  useEffect(() => {
      fetchPokemonData(props.id)
      fetchEvolution(props.id)
      
  },[props.id])

  useEffect(() =>{

    if(pokemonData){
    fetchAbility()
    }
  },[pokemonData]
  )
  // useEffect(() => {
  //   fetchEvolution(props.id)
  
  // },[props.id])


  const handleClose = () => {
    props.onClose()
  }
  
  return (
    
    <div>
        <div className = "modal">
            <div className = "overlay" onClick = {handleClose}></div>
                <div className = {`modal-content ${pokemonData && pokemonData.types[0].type.name}-modal`}>

        
                  <header>
                  <h1>{props.name}</h1>
                  <hr></hr>
                  </header>
                  <div className = "content-block">
                     {pokemonData &&  <InfoBlock data = {pokemonData}/>}
                     {abilityInfo && pokemonData && <ImageBlock data = {pokemonData} imgId = {imgId} abilityInfo = {abilityInfo}/>}
                     {pokemonData && <MovesBlock data = {pokemonData}/>} 
                    

                
                  {/* <div className = "image-Block">
                      <div className='pokemonData'>
                      <img src = {`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`} alt = "Pokemon" className = "Pokecard-image"/>
                      </div>

                      {pokemonData &&(
                        <div>
                          <h3>Ability</h3>
                          <h4>{pokemonData.abilities[0].ability.name}</h4>
                          <hr></hr>
                          <p>{abilityInfo}</p>
                        </div>
                      )}

                      <h3>Evolution Chain Here</h3>

                    </div>    */}
            

          </div>
             
            {/* <button onClick = {handleClose}>
              <p>Close</p>
            </button> */}
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

// function shortenString(str){
//   let delimiter = '.';
//   let start = 1;
//   let tokens = str.split(delimiter).slice(0, start);
//   return tokens.join(delimiter);
// }
import React, {useState, useEffect} from 'react'
import evolutionChainFetch from '../utils/evolutionDataAPI';
import './ImageBlock.css'


const ImageBlock = (props) => {

    const [evolutionData, setEvolutionData] = useState(null);
    const {data, imgId, id} = props
   // console.log(` Ability Info: ${abilityInfo}`)
    console.log('Pokemon Data Log')

    const fetchEvolution = async(id) => {
        const result = await evolutionChainFetch(id)
        console.log('evolution chain result')
        console.log(result)
       let resultArray = parseEvolution(result)
        
        setEvolutionData(resultArray)
      }

    useEffect(() => {
        fetchEvolution(id)
        
    },[id])
  

  return (
    <div className = "ImageBlock">
        <div className='pokemonData'>
            <img src = {`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`} alt = "Pokemon" className = "Pokecard-image"/>
                </div>

                     
                        {/* <div>
                          <h3>Ability</h3>
                          <h4>{data.abilities[0].ability.name}</h4>
                          <hr></hr>
                          <p>{abilityInfo}</p>
                        </div> */}
                     

            <h3>Evolution Chain</h3>
            <hr></hr>
            <div className = "evolution-chain">
            {evolutionData &&
                (evolutionData.map((evolutions) => (
                    <div>
                    <img src = {`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${evolutions[1]}.png`} alt = "evolution" ></img>
                    <p>{evolutions[0]}</p>
                    </div>
                )))
            }
            </div>
            

    </div>
    
  )
}

export default ImageBlock

function parseEvolution(data){
    //End result needs to be an array of the ids in each evolution and name of pokemon
    //While data.evolves_to
    let evolutionArray = [];
    while(true){
        let name = data.species.name;
        let id = (data.species.url).split('/');
        console.log(id)
        let arrayLength = id.length
        id = makeIndexThreeCharacters(id[arrayLength-2])
        evolutionArray.push([name,id])
        console.log(evolutionArray)
        if(Object.keys(data.evolves_to).length<=0){
            return evolutionArray
        }
        // if(Object.keys(data.evolves_to).length>0){
        data = data.evolves_to[0]
        // }
    }
   
}

function makeIndexThreeCharacters(index) {
    let indexString = index.toString();
    while (indexString.length < 3) {
      indexString = '0' + indexString;
    }
    return indexString;
  }
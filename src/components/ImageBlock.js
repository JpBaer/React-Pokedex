import React, {useState, useEffect} from 'react'
import './ImageBlock.css'


const ImageBlock = (props) => {

    const {data, imgId, abilityInfo} = props
   // console.log(` Ability Info: ${abilityInfo}`)
    console.log('Pokemon Data Log')
    console.log(data)


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

    </div>
    
  )
}

export default ImageBlock
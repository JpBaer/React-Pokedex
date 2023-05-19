import React from 'react'
import './MovesBlock.css'

const MovesBlock = (props) => {
    const{data} = props
  return (
    <div className = "MovesBlock">
        <h3>Ability</h3>
        <p>{data.abilities[0].ability.name}</p>
        <hr></hr>
        <h3>Moves</h3>
        <div className = "MovesBlock-Moves">
            {data.moves.map((moves)=> (
                <p>{moves.move.name}</p>
            ))}
        </div>
    </div>
  )
}

export default MovesBlock
import React from 'react'
import './InfoBlock.css'

const InfoBlock = (props) => {
  let  {height, weight, moves, types, stats} = props.data

  return (
    <div className={`InfoBlock`}>
        <h4>Type</h4>
         {types ?  (<div>
            <p>
               {types.map((type) => type.type.name).join(', ')
            }
            </p>
            </div>)
            : (
                <div>Loading...</div>
            )}

            {/* <div> Type Logos?</div> */}
            <hr></hr>
                <p>Height: {height}cm  |  Weight: {weight}kg</p>
            <hr></hr>
                <h4>Base Stats</h4>
                    <p>Hit Points: {stats[0].base_stat}</p>
                    <p>Attack: {stats[1].base_stat}</p>
                    <p>Defense: {stats[2].base_stat}</p>
                    <p>Special-Attack: {stats[3].base_stat}</p>
                    <p>Special-Defense: {stats[4].base_stat}</p>
                    <p>Speed: {stats[5].base_stat}</p>
            <hr></hr>
                

    </div>
  )
}

export default InfoBlock
import React from 'react'
import Rule from './Rule'



function Rules({rules, tournamentName}) {
    return (
        <div>
            {rules && rules.map(rule => (
            <Rule key={rule} rule={rule} tournamentName={tournamentName}/>
            ))}
        </div>
    )
}

export default Rules

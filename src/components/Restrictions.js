import React from 'react'

import Restriction from './Restriction';

function Restrictions({restrictions, tournamentName}) {

    return (
        <div>
            {restrictions && restrictions.map(restriction => (
                <Restriction key={`restriction = ${restriction}`} tournamentName={tournamentName} restriction={restriction}/>
            ))}
        </div>
    )
}


export default Restrictions

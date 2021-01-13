import React, {useState} from 'react'
import Participant from './Participant'


function Participants({participants, tournamentName}) {

    return (
        <div>
            {participants && participants.map(participant => (
                <Participant key={`participant = ${participant}`} participant={participant} tournamentName={tournamentName}/>))}
        </div>
    )
}


export default Participants

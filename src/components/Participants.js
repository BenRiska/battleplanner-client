import React, {useState} from 'react'
import Participant from './Participant'
import { useMutation} from '@apollo/react-hooks';
import {FETCH_TOURNAMENT_QUERY, ADD_PARTICIPANT} from "../utils/queries"


function Participants({participants, tournamentName}) {

    const [newParticipant, setNewParticipant] = useState("")

    const [addParticipant] = useMutation(ADD_PARTICIPANT, {
        update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.addParticipant},
                variables: {tournamentName}
            })
            setNewParticipant("")
        },
        refetchQueries: [
          {query: FETCH_TOURNAMENT_QUERY, variables: {tournamentName}}
        ],
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournamentName, name: newParticipant.trim()}
    })

    const executeAddParticipant = () => {
        if(newParticipant.length > 0){
            addParticipant()
        }
    }

    return (
        <div className="preGameInfo__column">
            <h2>Participants</h2>
            <div className="preGameInfo__form">
                <input value={newParticipant} onChange={e => setNewParticipant(e.target.value)} placeholder="Participant.." name="participant" type="text"/>
                <img onClick={executeAddParticipant} src="../red-cross.svg" alt="add icon"/>
            </div>
            {participants && participants.map(participant => (
                <Participant key={`participant = ${participant.name}`} participant={participant} tournamentName={tournamentName}/>))}
        </div>
)
}


export default Participants

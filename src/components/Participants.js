import React, {useState} from 'react'
import Participant from './Participant'
import { useMutation} from '@apollo/react-hooks';
import {FETCH_TOURNAMENT_QUERY, ADD_PARTICIPANT} from "../utils/queries"


function Participants({participants, tournamentName, hidden}) {

    const [newParticipant, setNewParticipant] = useState("")
    const [showForm, setShowForm] = useState(false)

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
            console.log(err);
          },
        variables: {tournamentName: tournamentName, name: newParticipant}
    })

    const executeAddParticipant = () => {
        if(newParticipant.length > 0){
            addParticipant()
        }
    }

    return (
        <div className="participants">
            {!hidden && (<div className="editTournament__form-container">
                <img onClick={() => setShowForm(prev => !prev)} className={showForm ? "form-active" : null} src="../close.svg" alt="close icon"/>
                {showForm &&
                (<div className="editTournament__form">
                    <input value={newParticipant} onChange={e => setNewParticipant(e.target.value)} placeholder="Participant.." name="participant" type="text"/>
                    <button onClick={executeAddParticipant}>
                        <img src="../white-arrow.svg" alt="arrow icon"/>
                    </button>
                </div>)
                }
            </div>)}
            {participants && participants.map(participant => (
                <Participant key={`participant = ${participant.name}`} participant={participant} hidden={hidden} tournamentName={tournamentName}/>))}
        </div>
    )
}


export default Participants

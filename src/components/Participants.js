import React, {useState} from 'react'
import Participant from './Participant'
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';


function Participants({participants, tournamentName, hidden}) {

    const [newParticipant, setNewParticipant] = useState("")
    const [showForm, setShowForm] = useState(false)

    const [addParticipant] = useMutation(ADD_PARTICIPANT, {
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
                (<form className="editTournament__form">
                    <input value={newParticipant} onChange={e => setNewParticipant(e.target.value)} placeholder="Participant.." name="participant" type="text"/>
                    <button onClick={executeAddParticipant}>
                        <img src="../white-arrow.svg" alt="arrow icon"/>
                    </button>
                </form>)
                }
            </div>)}
            {participants && participants.map(participant => (
                <Participant key={`participant = ${participant.name}`} participant={participant} hidden={hidden} tournamentName={tournamentName}/>))}
        </div>
    )
}

const ADD_PARTICIPANT = gql`
mutation($tournamentName: String!, $name: String!){
    addParticipant(tournamentName: $tournamentName, name: $name){
    name
    username
    rules
    restrictions
    participants {
        name
        status
    }
  }
}
`


export default Participants

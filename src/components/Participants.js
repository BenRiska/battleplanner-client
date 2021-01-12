import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Participants({participants, tournamentName}) {

    const [selectedParticipant, setSelectedParticipant] = useState("")

    const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, name: selectedParticipant}
    })

    const executeDeleteParticipant = (e) => {
        setSelectedParticipant(e.target.innerHTML)
        setTimeout(deleteParticipant, 1000)
    }



    return (
        <div>
            {participants && participants.map(participant => (
                <div key={participant?.name} onClick={e => executeDeleteParticipant(e)}>{participant?.name}</div>))}
        </div>
    )
}

const DELETE_PARTICIPANT = gql`
  mutation ($name: String!, $tournamentName: String!){
  deleteParticipant(name: $name, tournamentName: $tournamentName){
    name
    username
    rules
    restrictions
    participants{
      name
      status
    }
  }
}
`

export default Participants

import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Participant({participant, tournamentName}) {

    const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, name: participant.name}
    })

    const executeDeleteParticipant = (e) => {
        deleteParticipant()
    }

    return (
        <div>
            <p>{participant.name}</p>
            <button onClick={executeDeleteParticipant}>delete {participant.name}</button>
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

export default Participant

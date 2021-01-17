import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Participant({participant, tournamentName, hidden}) {

  const [openDelete, setOpenDelete] = useState(false)

    const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, name: participant.name}
    })

    return (
        <div className="participant">
            <p>{participant.name}</p>
            {!hidden && (<button onClick={() => setOpenDelete(prev => !prev)}>Remove</button>)}
            {openDelete && (<div className="edit-confirm-box">
              <p>Are you sure?</p>
              <div className="edit-confirm">
                <p onClick={() => setOpenDelete(prev => !prev)}>No</p>
                <p onClick={deleteParticipant}>Yes</p>
              </div>
            </div>)}
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

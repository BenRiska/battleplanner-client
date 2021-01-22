import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {DELETE_PARTICIPANT, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

function Participant({participant, tournamentName, hidden}) {

  const [openDelete, setOpenDelete] = useState(false)

    const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
          update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.deleteParticipant},
                variables: {tournamentName}
            })
        },
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



export default Participant

import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import {DELETE_PARTICIPANT, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

function Participant({participant, tournamentName}) {


    const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
          update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.deleteParticipant},
                variables: {tournamentName}
            })
        },
        refetchQueries: [
          {query: FETCH_TOURNAMENT_QUERY, variables: {tournamentName}}
        ],
        onError(err) {
            alert(err)
          },
        variables: {tournamentName: tournamentName, name: participant.name}
    })


    return (
        <div className="preGameInfo__column-item">
            <p>
              {participant?.name?.length > 20 ? 
              participant?.name?.slice(0, 20) + "..." 
              :
              participant?.name}
            </p>
            <button onClick={deleteParticipant}>Remove</button>
        </div>
    )
}



export default Participant

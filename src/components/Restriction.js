import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import {DELETE_RESTRICTION, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

function Restriction({restriction, tournamentName}) {

    const [deleteRestriction] = useMutation(DELETE_RESTRICTION, {
          update(proxy, result){
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.deleteRestriction},
              variables: {tournamentName}
          })
        },
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournamentName, restriction: restriction}
    })

    return (
        <div className="preGameInfo__column-item">
            <p>
            {restriction?.length > 14 ? 
              restriction?.slice(0, 14) + "..." 
              :
              restriction}
            </p>
            <button onClick={deleteRestriction}>Remove</button>
        </div>
    )
}




export default Restriction

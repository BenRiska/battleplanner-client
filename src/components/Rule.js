import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import {DELETE_RULE, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

function Rule({rule, tournamentName}) {

    const [deleteRule] = useMutation(DELETE_RULE, {
          update(proxy, result){
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.deleteRule},
              variables: {tournamentName}
          })
        },
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournamentName, rule: rule}
    })

    return (
        <div className="preGameInfo__column-item">
            <p>{rule?.length > 14 ? 
              rule?.slice(0, 14) + "..." 
              :
              rule}</p>
            <button onClick={deleteRule}>Remove</button>
        </div>
    )
}

export default Rule

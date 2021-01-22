import React, {useContext} from 'react'
import "../styles/tournament/RoundSummary.css"
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import {DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY, FETCH_TOURNAMENT_QUERY} from "../utils/queries"


function RoundSummary({tournament, executeStartNextRound}) {

    const history = useHistory()

    const { user } = useContext(AuthContext);

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENTS_QUERY,
              data: {getTournaments: result.data.deleteTournament},
              variables: {username: user?.username}
          })
          history.push("/")
      },
        onError(err) {
            console.log(err);
          }
    })

    const executeDeleteTournament = () => {
        deleteTournament({variables: {tournamentName: tournament.name}})
    }

    return (
        <div className="roundSummary">
            {tournament?.fights?.length < 2 ? 
            <div className="winners__card">
                <h2>Congrats</h2>
                <p>{tournament?.winner}!</p>
                <button onClick={executeDeleteTournament}>Delete Tournament</button>
            </div>
            : 
            <div className="roundSummary__content">
            <h2>Round Complete</h2>
            <p>Are you ready for the next?</p>
            <button onClick={executeStartNextRound}>Start</button>
            </div>
            }
        </div>
    )
}

export default RoundSummary

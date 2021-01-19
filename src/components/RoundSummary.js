import React from 'react'
import "../styles/tournament/RoundSummary.css"
import {useMutation} from '@apollo/react-hooks';
import {DELETE_TOURNAMENT_QUERY, START_NEXT_ROUND_QUERY} from "../utils/queries"


function RoundSummary({tournament}) {

    const [startNextRound] = useMutation(START_NEXT_ROUND_QUERY, {
        onError: (err) => console.log(err)
    })

    const executeStartNextRound = () => {
        startNextRound({variables: {tournamentName: tournament.name}})
    }

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        onError(err) {
            console.log(err);
          }
    })

    const executeDeleteTournament = () => {
        deleteTournament({variables: {tournamentName: tournament.name}})
    }

    return (
        <div className="roundSummary">
            {tournament?.fights.length < 2 ? 
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

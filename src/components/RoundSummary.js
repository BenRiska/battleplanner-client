import React from 'react'
import "../styles/tournament/RoundSummary.css"

import CompletedPage from './CompletedPage';


function RoundSummary({tournament, executeStartNextRound}) {

    return (
        <div className="roundSummary">
            {tournament?.fights?.length < 2 ? 
            <CompletedPage tournament={tournament}/>
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

import React from 'react'
import { Link } from 'react-router-dom';

function TournamentCard({tournament}) {
        return (
        <div>
            <Link to={`/tournament/${tournament.name}`}>{tournament.name}</Link>
        </div>
    )
}

export default TournamentCard

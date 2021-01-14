import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/home/TournamentCard.css"

function TournamentCard({tournament}) {
        return (
        <div className="tournamentCard">
            <div className="tournamentCard__inner">
                <h2>{tournament?.name}</h2>
                <div className="tournamentCard__info">
                    <div className="tournamentCard__left">
                        <img src="./team-icon.svg" alt="team icon"/>
                        <span>{tournament.participants.length}</span>
                    </div>
                    <div className="tournamentCard__right">
                        <p>Active</p>
                        <Link to={`/tournament/${tournament.name}`}>View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TournamentCard

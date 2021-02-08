import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/home/TournamentCard.css"

function TournamentCard({tournament}) {
        return (
        <div className="tournamentCard">
                <h2>{tournament?.name}</h2>
                <div className="tournamentCard__info">
                    <div className="tournamentCard__left">
                        <img src="./team-icon.svg" alt="team icon"/>
                        <span>{tournament?.participants?.length}</span>
                    </div>
                    <div className="tournamentCard__right">
                        {tournament?.active && 
                        <p className="active-tab">Active</p>}
                        {!tournament?.active && 
                        tournament?.round === 0
                        && 
                        <p className="start-tab">Ready</p>}
                        {!tournament?.active && 
                        tournament?.round > 0
                        && 
                        <p className="complete-tab">Completed</p>
                        }
                        <Link to={`/tournament/${tournament?.name}`}>View</Link>
                    </div>
                </div>
        </div>
    )
}

export default TournamentCard

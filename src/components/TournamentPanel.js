import React, {useState, useEffect} from 'react'
import "../styles/tournament/TournamentPanel.css"

function TournamentPanel({tournament}) {

    const [currentFight, setCurrentFight] = useState(null)
    const [remainingFights, setRemainingFights] = useState([])
    const [roundWinners, setRoundWinners] = useState([])
    const [roundLosers, setRoundLosers] = useState([])

    useEffect(() => {

        const completedFights = tournament.fights.filter(fight => (fight.concluded === true))

        let upcomingFights = tournament.fights.filter(fight => (fight.concluded === false))

        const upcomingFight = upcomingFights[0]

        upcomingFights = upcomingFights.slice(1)

        console.log(upcomingFights)

        setCurrentFight(upcomingFight)
        setRemainingFights(upcomingFights)
    }, [])

    return (
        <div className="tournamentPanel">
            <div className="tournamentPanel__main">
                <div className="tournamentPanel__current-fight">
                    <div className="vs">Vs</div>
                    <div className="current-fighter">
                        <img src="../ring.svg" alt="ring icon"/>
                        <p>{currentFight.fighterOne}</p>
                        <button>Winner</button>
                    </div>
                    <div className="current-fighter">
                        <img src="../ring-right.svg" alt="ring icon"/>
                        <p>{currentFight.fighterTwo}</p>
                        <button>Winner</button>
                    </div>
                </div>
                <div className="tournamentPanel__options">
                    <div className="tournamentPanel__options-box">
                        <button>Generate Restriction</button>
                        <button>End Tournament</button>
                    </div>
                    <div className="tournamentPanel__round-card">
                        <span>Final</span>
                        <span>{16}</span>
                    </div>
                </div>
            </div>
            <div className="tournamentPanel__upcoming">
                <div className="upcoming__sign">
                    <span>Upcoming</span>
                    <img src="../right-arrow.svg" alt="arrow icon"/>
                </div>
                {remainingFights.map(fight => (
                <div className="upcoming__card">
                    <span className="vs card-vs">Vs</span>
                    <span>{fight.fighterOne}</span>
                    <span>{fight.fighterTwo}</span>
                </div>
                ))}
            </div>
        </div>
    )
}

export default TournamentPanel

import React, {useState} from 'react'
import "../styles/tournament/FightPage.css"

function FightPage({tournament, currentFight, remainingFights, completedFights, executeEndFight, executeDeleteTournament}) {

    const [selectedWinner, setSelectedWinner] = useState("")

    const generateRestriction = () => {
        if(tournament.restrictions.length > 0){
        const num = Math.floor(Math.random() * (tournament.restrictions.length))
        alert(tournament.restrictions[num])}
        else{
            alert("This Tournament has no restrictions.")
        }
    }

    return (
        <div className="fightPage">
        <button className="red-btn" onClick={executeDeleteTournament}>End Tournament</button>
        <div className="fightPage__header">
            <button className="rules-btn">Rules</button>
            <h1>{tournament?.name}</h1>
            <button onClick={generateRestriction} className="restriction-btn">Generate Restriction</button>
        </div>
        <div className="fightPage__main-fight">
            <div className="vs">Vs</div>
            <img className="fightPage__char" src="../fightpage-char.svg" alt="char icon"/>
            <div className="current-fighter">
                <img src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} alt="player icon"/>
                <p 
                style={{backgroundColor: selectedWinner === currentFight?.fighterOne ? "#2DB67C" : "initial",color: selectedWinner === currentFight?.fighterOne ? "white" : "black"}}
                onClick={() => setSelectedWinner(currentFight?.fighterOne)}
                >
                    {currentFight?.fighterOne}
                </p>
            </div>
            <div className="current-fighter">
                <img src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} alt="player icon"/>
                <p 
                style={
                    {backgroundColor: selectedWinner === currentFight?.fighterTwo ? "#2DB67C" : "initial",
                    color: selectedWinner === currentFight?.fighterTwo ? "white" : "black"
                    }
                }
                onClick={() => setSelectedWinner(currentFight?.fighterTwo)}
                >
                    {currentFight?.fighterTwo}
                </p>
            </div>
            <button className="winner-btn" onClick={() => {
                if(selectedWinner.length > 0){
                    executeEndFight(selectedWinner)
                }
            }
                }>Winner</button>
        </div>
        <div className="fightPage__stats">
        <div className="fightPage__round-card">
                <span>Final</span>
                <span>{tournament?.fights?.length * 2}</span>
            </div>
        </div>
        <div className="fightPage__list">
            <div className="fightPage__upcoming">
                <h2>Upcoming</h2>
                {remainingFights?.map(fight => 
                    <div key={fight.id}>
                        <p>{fight.fighterOne}</p>
                        <span>Vs</span>
                        <p>{fight.fighterTwo}</p>
                    </div>
                )}
            </div>
            <div className="fightPage__completed">
                <h2>Completed</h2>
            {completedFights?.map(fight => 
                    <div key={fight.id}>
                        <p style={{color: fight.winner === fight.fighterOne ? "#E01E5A" :  "#2DB67C"}}>
                            {fight.fighterOne}
                        </p>
                        <span>Vs</span>
                        <p style={{color: fight.winner === fight.fighterTwo ? "#E01E5A" :  "#2DB67C"}}>
                            {fight.fighterTwo}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}

export default FightPage

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
        <div className="fightPage__header">
            <h1>{tournament?.name?.length > 14 ? 
              tournament?.name?.slice(0, 14) + "..." 
              :
              tournament?.name}</h1>
            <div className="fightPage__button-container">
            <button className="rules-btn">Rules</button>
            <button onClick={generateRestriction} className="restriction-btn">Generate Restriction</button>
            </div>
        </div>
        <div className="fightPage__main-fight">
            <div className="vs">Vs</div>
            <img className="fightPage__char" src="../fightpage-char.svg" alt="char icon"/>
            <div className="current-fighter">
                <img onClick={() => setSelectedWinner(currentFight?.fighterOne)} src={"../fighter1.png"} alt="player icon"/>
                <p 
                style={{backgroundColor: selectedWinner === currentFight?.fighterOne ? "#2DB67C" : "initial",color: selectedWinner === currentFight?.fighterOne ? "white" : "black"}}
                onClick={() => setSelectedWinner(currentFight?.fighterOne)}
                >
                    {currentFight?.fighterOne?.length > 6 ? 
              currentFight?.fighterOne?.slice(0, 6) + ".." 
              :
              currentFight?.fighterOne?.name}
                </p>
            </div>
            <div className="current-fighter">
                <img onClick={() => setSelectedWinner(currentFight?.fighterTwo)} src={"../fighter2.png"} alt="player icon"/>
                <p 
                style={
                    {backgroundColor: selectedWinner === currentFight?.fighterTwo ? "#2DB67C" : "initial",
                    color: selectedWinner === currentFight?.fighterTwo ? "white" : "black"
                    }
                }
                onClick={() => setSelectedWinner(currentFight?.fighterTwo)}
                >
                    {currentFight?.fighterTwo?.length > 6 ? 
              currentFight?.fighterTwo?.slice(0, 6) + ".." 
              :
              currentFight?.fighterTwo?.name}
                </p>
            </div>
            <button className="winner-btn" onClick={() => {
                if(selectedWinner.length > 0){
                    executeEndFight(selectedWinner)
                } else{
                    alert("You must select a winner.")
                }
            }
                }>Winner</button>
        </div>
        <div className="fightPage__list">
            <div className="fightPage__upcoming">
                <h2>Upcoming</h2>
                {remainingFights?.map(fight => 
                    <div key={fight.id}>
                        <p>{currentFight?.fighterOne?.length > 6 ? 
              currentFight?.fighterOne?.slice(0, 6) + ".." 
              :
              currentFight?.fighterOne?.name}</p>
                        <span>Vs</span>
                        <p>{currentFight?.fighterTwo?.length > 6 ? 
              currentFight?.fighterTwo?.slice(0, 6) + ".." 
              :
              currentFight?.fighterTwo?.name}</p>
                    </div>
                )}
            </div>
            <div className="fightPage__completed">
                <h2>Completed</h2>
            {completedFights?.map(fight => 
                    <div key={fight.id}>
                        <p style={{color: fight.winner === fight.fighterOne ?  "#2DB67C" : "#E01E5A"}}>
                        {currentFight?.fighterOne?.length > 6 ? 
              currentFight?.fighterOne?.slice(0, 6) + ".." 
              :
              currentFight?.fighterOne?.name}
                        </p>
                        <span>Vs</span>
                        <p style={{color: fight.winner === fight.fighterTwo ?  "#2DB67C" : "#E01E5A"}}>
                        {currentFight?.fighterTwo?.length > 6 ? 
              currentFight?.fighterTwo?.slice(0, 6) + ".." 
              :
              currentFight?.fighterTwo?.name}
                        </p>
                    </div>
                )}
            </div>
        </div>
        <button className="red-btn" onClick={executeDeleteTournament}>End Tournament</button>
    </div>
    )
}

export default FightPage

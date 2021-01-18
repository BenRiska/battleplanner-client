import React from 'react'
import "../styles/tournament/PlayerStatusBar.css"

function PlayerStatusBar({winners, losers}) {
    return (
        <div className="statusBar">
            <div className="statusBar__winners">
                <div className="statusBar__seperater">
                    <img src="../green-dot.svg" alt=""/>
                </div>
                {winners?.map((winner) => (
                    <div className="statusBar__participant" key={winner}>{winner}</div>
                ))}
            </div>
            <div className="statusBar__losers">
                <div className="statusBar__seperater">
                    <img src="../red-dot.svg" alt=""/>
                </div>
                {losers?.map((loser) => (
                    <div className="statusBar__participant" key={loser}>{loser}</div>
                ))}
            </div>
        </div>
    )
}

export default PlayerStatusBar

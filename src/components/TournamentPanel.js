import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import "../styles/tournament/TournamentPanel.css"
import RoundSummary from './RoundSummary';

function TournamentPanel({tournament}) {

    const [currentFight, setCurrentFight] = useState(null)
    const [remainingFights, setRemainingFights] = useState([])


    useEffect(() => {
        let upcomingFights = tournament?.fights.filter(fight => (fight.concluded === false))

        if(upcomingFights.length === 1){
            setCurrentFight(upcomingFights[0])
        } else{
            setCurrentFight(upcomingFights[0])
            upcomingFights = upcomingFights.slice(1, upcomingFights.length)
            setRemainingFights(upcomingFights)
        }
    }, [])

    const [endFight] = useMutation(END_FIGHT_QUERY, {
        onError(err) {
            console.log(err);
          }
    })

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        onError(err) {
            console.log(err);
          }
    })

    const executeEndFight = (winner) => {
        endFight({variables: {tournamentName: tournament.name, winner }})
    }

    const executeDeleteTournament = () => {
        deleteTournament({variables: {tournamentName: tournament.name}})
    }

    return (
        <div className="tournamentPanel">
            {currentFight ? 
            (<>
            <div className="tournamentPanel__main">
                <div className="tournamentPanel__current-fight">
                    <div className="vs">Vs</div>
                    <div className="current-fighter">
                        <img src="../ring.svg" alt="ring icon"/>
                        <p>{currentFight?.fighterOne}</p>
                        <button onClick={() => executeEndFight(currentFight?.fighterOne)}>Winner</button>
                    </div>
                    <div className="current-fighter">
                        <img src="../ring-right.svg" alt="ring icon"/>
                        <p>{currentFight?.fighterTwo}</p>
                        <button onClick={() => executeEndFight(currentFight?.fighterTwo)}>Winner</button>
                    </div>
                </div>
                <div className="tournamentPanel__options">
                    <div className="tournamentPanel__options-box">
                        <button>Generate Restriction</button>
                        <button onClick={executeDeleteTournament}>End Tournament</button>
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
                {remainingFights?.map(fight => (
                <div className="upcoming__card">
                    <span className="vs card-vs">Vs</span>
                    <span>{fight.fighterOne}</span>
                    <span>{fight.fighterTwo}</span>
                </div>
                ))}
            </div>
            </>) : 
            <RoundSummary tournament={tournament}/>}
        </div>
    )
}

const END_FIGHT_QUERY = gql`
    mutation($tournamentName: String!, $winner: String!){
  endFight(tournamentName: $tournamentName, winner: $winner){
    name
    username
    rules
    restrictions
    participants{
      name
      status
    }
    active
    fights{
      fighterOne
      fighterTwo
      concluded
      winner
    }
    round
    winner
  }
}
`

const DELETE_TOURNAMENT_QUERY = gql`
    mutation($tournamentName: String!){
  deleteTournament(tournamentName: $tournamentName){
    res
  }
}
`



export default TournamentPanel
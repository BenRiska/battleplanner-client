import React, {useState, useEffect, useContext} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import "../styles/tournament/TournamentPanel.css"
import RoundSummary from './RoundSummary';
import {END_FIGHT_QUERY, DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY, FETCH_TOURNAMENT_QUERY, START_NEXT_ROUND_QUERY} from "../utils/queries"

function TournamentPanel({tournament, setRoundLosers, setRoundWinners}) {

    const [currentFight, setCurrentFight] = useState(null)
    const [remainingFights, setRemainingFights] = useState([])

    const { user } = useContext(AuthContext);

    const history = useHistory()


    useEffect(() => {
        let upcomingFights = tournament?.fights?.filter(fight => (fight.concluded === false))

        if(upcomingFights?.length === 1 && upcomingFights){
            setCurrentFight(upcomingFights[0])
        } else if (upcomingFights){
            setCurrentFight(upcomingFights[0])
            upcomingFights = upcomingFights.slice(1, upcomingFights.length)
            setRemainingFights(upcomingFights)
        }
    }, [tournament])

    const [endFight] = useMutation(END_FIGHT_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.endFight},
              variables: {username: user?.username}
          })

          let upcomingFights = result.data.endFight?.fights?.filter(fight => (fight.concluded === false))

        if(upcomingFights?.length === 1 && upcomingFights){
            setCurrentFight(upcomingFights[0])
            setRemainingFights([])
        } else if (upcomingFights){
            setCurrentFight(upcomingFights[0])
            upcomingFights = upcomingFights.slice(1, upcomingFights.length)
            setRemainingFights(upcomingFights)
        }

        const completedFights = result.data.endFight?.fights?.filter(fight => (fight.concluded === true))

        let winnerList = []
        let loserList = []

        completedFights?.forEach(fight => {
            if(fight.fighterOne === fight.winner){
                winnerList.push(fight.fighterOne)
                loserList.push(fight.fighterTwo)
            } else{
                loserList.push(fight.fighterOne)
                winnerList.push(fight.fighterTwo)
            }
        })

        setRoundLosers(loserList)
        setRoundWinners(winnerList)

      },
        onError(err) {
            alert(err);
          }
    })

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENTS_QUERY,
              data: {getTournaments: result.data.deleteTournament},
              variables: {username: user?.username}
          })
          history.push("/")
      },
        onError(err) {
            alert(err);
          }
    })

    const [startNextRound] = useMutation(START_NEXT_ROUND_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.startNextRound},
              variables: {username: user?.username}
          })

          let upcomingFights = result.data.startNextRound?.fights?.filter(fight => (fight.concluded === false))

        if(upcomingFights?.length === 1 && upcomingFights){
            setCurrentFight(upcomingFights[0])
            setRemainingFights([])
        } else if (upcomingFights){
            setCurrentFight(upcomingFights[0])
            upcomingFights = upcomingFights.slice(1, upcomingFights.length)
            setRemainingFights(upcomingFights)
        }

        const completedFights = result.data.endFight?.fights?.filter(fight => (fight.concluded === true))

        let winnerList = []
        let loserList = []

        completedFights?.forEach(fight => {
            if(fight.fighterOne === fight.winner){
                winnerList.push(fight.fighterOne)
                loserList.push(fight.fighterTwo)
            } else{
                loserList.push(fight.fighterOne)
                winnerList.push(fight.fighterTwo)
            }
        })

        setRoundLosers(loserList)
        setRoundWinners(winnerList)
      },
        onError: (err) => alert(err)
    })

    const executeStartNextRound = () => {
        startNextRound({variables: {tournamentName: tournament.name}})
    }

    const executeEndFight = (winner) => {
        endFight({variables: {tournamentName: tournament.name, winner }})
    }

    const executeDeleteTournament = () => {
        deleteTournament({variables: {tournamentName: tournament.name}})
    }

    const generateRestriction = () => {
        const num = Math.floor(Math.random() * (tournament.restrictions.length))
        alert(tournament.restrictions[num])
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
                        {tournament.restrictions.length > 1 && (<button onClick={generateRestriction} >Generate Restriction</button>)}
                        <button className="red-btn" onClick={executeDeleteTournament}>End Tournament</button>
                    </div>
                    <div className="tournamentPanel__round-card">
                        <span>Final</span>
                        <span>{tournament?.fights?.length * 2}</span>
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
            <RoundSummary executeStartNextRound={executeStartNextRound} tournament={tournament}/>}
        </div>
    )
}

export default TournamentPanel

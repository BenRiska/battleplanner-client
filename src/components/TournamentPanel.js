import React, {useState, useEffect, useContext} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import "../styles/tournament/TournamentPanel.css"
import RoundSummary from './RoundSummary';
import {END_FIGHT_QUERY, DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY, FETCH_TOURNAMENT_QUERY, START_NEXT_ROUND_QUERY} from "../utils/queries"
import FightPage from './FightPage';

function TournamentPanel({tournament, setRoundLosers, setRoundWinners}) {

    const [currentFight, setCurrentFight] = useState(null)
    const [remainingFights, setRemainingFights] = useState([])
    const [completedFights, setCompletedFights] = useState([])


    const { user } = useContext(AuthContext);

    const history = useHistory()


    useEffect(() => {
        let upcomingFights = tournament?.fights?.filter(fight => (fight.concluded === false))
        setCompletedFights(tournament?.fights?.filter(fight => (fight.concluded === true)))

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
          setCompletedFights(result.data.endFight?.fights?.filter(fight => (fight.concluded === true)))

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

    return (
        <div className="tournamentPanel">
            {currentFight ? 
            (<FightPage 
                tournament={tournament} 
                currentFight={currentFight} 
                remainingFights={remainingFights}
                completedFights={completedFights}
                executeEndFight={executeEndFight}
                executeDeleteTournament={executeDeleteTournament}
            />) : 
            <RoundSummary executeStartNextRound={executeStartNextRound} tournament={tournament}/>}
        </div>
    )
}

export default TournamentPanel



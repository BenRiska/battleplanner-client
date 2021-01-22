import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks';
import EditTournament from '../components/EditTournament';
import {useParams} from 'react-router-dom';
import "../styles/tournament/Tournament.css"
import NavBar from "../components/NavBar"
import PreGameInfo from '../components/PreGameInfo';
import TournamentPanel from '../components/TournamentPanel';
import PlayerStatusBar from '../components/PlayerStatusBar';
import {FETCH_TOURNAMENT_QUERY} from "../utils/queries"


function Tournament() {

    const [roundWinners, setRoundWinners] = useState([])
    const [roundLosers, setRoundLosers] = useState([])

    const {id} = useParams()

    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {
      onCompleted: (data) => {
        const completedFights = data?.getTournament?.fights?.filter(fight => (fight.concluded === true))

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
      variables: {tournamentName: id}})

      console.log(loading, error)

    return (
        <div className="tournament">
            <NavBar alterImageRoute/>
            <div className="tournament__main">
                {!tournament?.winner && <EditTournament tournament={tournament}/>}
                {tournament?.round === 0 ? (
                  <PreGameInfo tournament={tournament}/>
                ): (
                  <TournamentPanel setRoundLosers={setRoundLosers} setRoundWinners={setRoundWinners} tournament={tournament}/>
                )}
                {tournament?.active && <PlayerStatusBar winners={roundWinners} losers={roundLosers}/>}
            </div>
        </div>
    )
}

export default Tournament

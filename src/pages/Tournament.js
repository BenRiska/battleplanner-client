import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks';
import {useParams} from 'react-router-dom';
import {FETCH_TOURNAMENT_QUERY} from "../utils/queries"
import "../styles/tournament/Tournament.css"
import NavBar from "../components/NavBar"
import PreGameInfo from '../components/PreGameInfo';
import TournamentPanel from '../components/TournamentPanel';



function Tournament() {

    const [roundWinners, setRoundWinners] = useState([])
    const [roundLosers, setRoundLosers] = useState([])

    const {id} = useParams()

    console.log(typeof(id), typeof("ben"))

    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {
      fetchPolicy: "network-only",
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

      if (tournament) console.log(tournament)

      if(error) console.log(error)

    return (
        loading ? <div>loading</div> :
        <div className="tournament">
            <NavBar alterImageRoute/>
            <div className="tournament__main">
                {tournament?.round === 0 && (
                  <PreGameInfo tournament={tournament}/>
                )}
                { tournament?.round > 0 && (
                  <TournamentPanel setRoundLosers={setRoundLosers} setRoundWinners={setRoundWinners} tournament={tournament}/>
                )}
            </div>
        </div>
    )
}

export default Tournament

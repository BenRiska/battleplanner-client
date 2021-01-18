import React, {useContext, useState} from 'react'
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import EditTournament from '../components/EditTournament';
import {useParams} from 'react-router-dom';
import "../styles/tournament/Tournament.css"
import NavBar from "../components/NavBar"
import PreGameInfo from '../components/PreGameInfo';
import TournamentPanel from '../components/TournamentPanel';
import PlayerStatusBar from '../components/PlayerStatusBar';


function Tournament() {

    const [roundWinners, setRoundWinners] = useState([])
    const [roundLosers, setRoundLosers] = useState([])
    const { user } = useContext(AuthContext);

    const {id} = useParams()

    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {
      onCompleted: (data) => {
        const completedFights = data.getTournament.fights.filter(fight => (fight.concluded === true))

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
      variables: { username: user.username, tournamentName: id}})

    return (
        <div className="tournament">
            <NavBar alterImageRoute/>
            <div className="tournament__main">
                <EditTournament tournament={tournament}/>
                {tournament?.active ? (
                  <TournamentPanel tournament={tournament}/>
                ): (
                  <PreGameInfo tournament={tournament}/>
                )}
                {tournament?.active && <PlayerStatusBar winners={roundWinners} losers={roundLosers}/>}
            </div>
        </div>
    )
}

const FETCH_TOURNAMENT_QUERY = gql`
  query ($username: String!, $tournamentName: String!){
  getTournament(username: $username, tournamentName: $tournamentName){
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

export default Tournament

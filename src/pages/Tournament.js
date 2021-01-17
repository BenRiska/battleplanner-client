import React, {useContext} from 'react'
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

    const { user } = useContext(AuthContext);

    const {id} = useParams()



    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {variables: { username: user.username, tournamentName: id}})
    
    console.log(tournament)

    console.log(error, loading)


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
                {tournament?.active && <PlayerStatusBar/>}
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
    }
    round
    winner
  }
}
`

export default Tournament

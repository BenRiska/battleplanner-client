import React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {useParams} from 'react-router-dom';
import {FETCH_TOURNAMENT_QUERY} from "../utils/queries"
import "../styles/tournament/Tournament.css"
import NavBar from "../components/NavBar"
import PreGameInfo from '../components/PreGameInfo';
import TournamentPanel from '../components/TournamentPanel';



function Tournament() {

    const {id} = useParams()

    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {
      fetchPolicy: "network-only",
      variables: {tournamentName: id}})

    if (error) alert(error)

    return (
        loading ? <div>loading</div> :
        <div className="tournament">
            <NavBar alterImageRoute />
            <div className="tournament__main">
                {tournament?.round === 0 && (
                  <PreGameInfo tournament={tournament}/>
                )}
                { tournament?.round > 0 && (
                  <TournamentPanel tournament={tournament}/>
                )}
            </div>
        </div>
    )
}

export default Tournament

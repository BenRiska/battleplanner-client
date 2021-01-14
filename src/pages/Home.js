import React, { useContext,} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import "../styles/home/home.css"

import { AuthContext } from '../context/auth';
import Navbar from "../components/NavBar"
import TournamentForm from '../components/TournamentForm';
import TournamentCard from '../components/TournamentCard';

function Home() {

    const { user } = useContext(AuthContext);

    const { loading, error, data: { getTournaments: tournaments } = {}} = useQuery(FETCH_TOURNAMENTS_QUERY, {variables: { username: user.username}})

    console.log(tournaments, error)

    return (
        <div className="home"> 
            <Navbar/>
            {loading ? (
                <div>
                    <h2>Loading</h2>
                </div>
            )
            : 
            (
                <div className="home__grid">
                <TournamentForm/>
                {tournaments.map(tournament => <TournamentCard key={tournament.name} tournament={tournament}/>)
                }
               </div>
            )
            }
        </div>
    )
}

export const FETCH_TOURNAMENTS_QUERY = gql`
  query ($username: String!){
  getTournaments(username: $username){
    name
    rules
    username
    restrictions
    participants{
      name
      status
    }
  }
}
`;

export default Home

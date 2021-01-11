import React, { useContext,} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import TournamentForm from '../components/TournamentForm';
import TournamentCard from '../components/TournamentCard';

function Home() {

    const { user } = useContext(AuthContext);

    const { loading, error, data: { getTournaments: tournaments } = {}} = useQuery(FETCH_TOURNAMENTS_QUERY, {variables: { username: user.username}})

    console.log(tournaments)

    return (
        <div> 
            <TournamentForm/>
            {loading ? (
                <div>
                    <h2>Loading</h2>
                </div>
            )
            : 
            (
                <div>
                {tournaments.map(tournament => <TournamentCard tournament={tournament}/>)
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

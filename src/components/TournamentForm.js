import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function TournamentForm(props) {

    const [tournamentName, setTournamentName] = useState("")
    const [errors, setErrors] = useState({})

    const [createTournament, ] = useMutation(CREATE_TOURNAMENT, {
        variables: {tournamentName},
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
      });

    function executeQuery(e) {
        if(tournamentName.length > 0){
        createTournament();
        }
      }

      console.log(errors)

    return (
        <div>
            <h1>Create a Tournament</h1>
            <form>
                <div className="tournament__input">
                    <label>Name</label>
                    <input onChange={e => setTournamentName(e.target.value)}  placeholder="Name.." name="name" type="text"/>
                </div>
                <button onClick={e => executeQuery(e)}>Create</button>
            </form>
        </div>
    )
}

const CREATE_TOURNAMENT = gql`
 mutation createTournament(
     $tournamentName: String!
     ){
        createTournament(
            tournamentName: $tournamentName
        ){
        name
        username
    }
}
`;

export default TournamentForm

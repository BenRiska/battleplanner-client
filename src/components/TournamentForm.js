import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import "../styles/home/TournamentForm.css"
import {CREATE_TOURNAMENT, FETCH_TOURNAMENTS_QUERY} from "../utils/queries"
import {useHistory} from "react-router-dom"

function TournamentForm() {

    const [tournamentName, setTournamentName] = useState("")

    const history = useHistory()

    const { user } = useContext(AuthContext);

    const [createTournament, ] = useMutation(CREATE_TOURNAMENT, {
      update(proxy, result){
        const data = proxy.readQuery({
            query: FETCH_TOURNAMENTS_QUERY,
            variables: {username: user?.username}
        })
        data.getTournaments = [...data.getTournaments, result.data.createTournament]     
        console.log(data) 
          proxy.writeQuery({
            query: FETCH_TOURNAMENTS_QUERY,
            data,
            variables: {username: user?.username}
        })
        history.push(`/tournament/${result.data.createTournament.name}`)
    },
        variables: {tournamentName},
        onError(err) {
          console.log(err);
        }
      });

    function executeQuery(e) {
        if(tournamentName.length > 0){
        createTournament();
        }
      }

    return (
        <div className="tournamentForm">
            <h1>New Tournament</h1>
            <div>
                <div className="tournament__input">
                    <input onChange={e => setTournamentName(e.target.value)}  placeholder="Name.." name="name" type="text"/>
                </div>
                <button onClick={e => executeQuery(e)}>Create</button>
            </div>
        </div>
    )
}

export default TournamentForm

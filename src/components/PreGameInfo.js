import React, {useContext} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import "../styles/tournament/PreGameInfo.css"
import {START_GAME_QUERY, DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY, FETCH_TOURNAMENT_QUERY} from "../utils/queries"


function PreGameInfo({tournament}) {

    const { user } = useContext(AuthContext);

    const history = useHistory()

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
          console.log(err);
        },
        variables: {tournamentName: tournament?.name}
    })

    const [StartGame] = useMutation(START_GAME_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.startGame},
              variables: {username: user?.username}
          })
      },
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournament?.name}
    })



    const StartTournament = () => {
        if(
            tournament?.participants.length > 1 && 
            tournament?.participants.length % 2 === 0
        ){
            StartGame()
        } else{
            console.log("add people")
        }
    }

    return (
        <div className="preGameInfo">
            <button className="delete-tournament-btn" onClick={deleteTournament}>
                Delete
            </button>
            <h1>Set up your tournament before starting</h1>
            <p>Make sure you have added:</p>
            <ul>
                <li>- Participants</li>
                <li>- Rules (optional)</li>
                <li>- Restrictions (optional)</li>
            </ul>
            <button onClick={StartTournament} className="start-tournament-btn">Start</button>
        </div>
    )
}

export default PreGameInfo

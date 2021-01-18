import React from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import "../styles/tournament/PreGameInfo.css"

function PreGameInfo({tournament}) {

    const history = useHistory()

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        update(){
            history.push("/")
        },
        onError(err) {
          console.log(err);
        },
        variables: {tournamentName: tournament?.name}
    })

    const [StartGame] = useMutation(START_GAME_QUERY, {
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

const DELETE_TOURNAMENT_QUERY = gql`
mutation($tournamentName: String!){
    deleteTournament(tournamentName: $tournamentName){
        res
    }
}
`

const START_GAME_QUERY = gql`
mutation($tournamentName: String!){
  startGame(tournamentName: $tournamentName){
    name
    fights{
      fighterOne
      fighterTwo
      concluded
    }
    round
  }
}
`

export default PreGameInfo

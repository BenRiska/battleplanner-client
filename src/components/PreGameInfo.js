import React from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import "../styles/tournament/PreGameInfo.css"

function PreGameInfo({tournamentName}) {

    const history = useHistory()

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        update(){
            history.push("/")
        },
        onError(err) {
          console.log(err);
        },
        variables: {tournamentName: tournamentName}
    })

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
            <button className="start-tournament-btn">Start</button>
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

export default PreGameInfo

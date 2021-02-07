
import React, {useContext} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import {DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY} from "../utils/queries"
import "../styles/tournament/CompletedPage.css"

function CompletedPage({tournament}) {

    const history = useHistory()

    const { user } = useContext(AuthContext);

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
            alert(err);
          }
    })

    const executeDeleteTournament = () => {
        deleteTournament({variables: {tournamentName: tournament?.name}})
    }

    return (
        <div className="completedPage">
            <h1>{tournament?.name}</h1>
            <button onClick={executeDeleteTournament}>Delete</button>
            <div className="winnerCard">
                <h2>
                    <p>Congratulations</p>
                    <p>{tournament?.winner}!</p>
                </h2>
                <img src="../main-char.svg" alt="char logo"/>
            </div>
            <h2>Participants</h2>
            <div className="completedPage__grid">
            {tournament?.participants?.map(p => <div>{p.name}</div>)}
            </div>
        </div>
    )
}

export default CompletedPage

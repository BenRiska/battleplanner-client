import React, {useContext} from 'react'
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import Rules from '../components/Rules';
import Restrictions from '../components/Restrictions';
import Participants from '../components/Participants';
import EditTournament from '../components/EditTournament';
import { useParams, useHistory } from 'react-router-dom';
import "../styles/tournament/Tournament.css"
import NavBar from "../components/NavBar"


function Tournament(props) {

    const { user } = useContext(AuthContext);

    const history = useHistory()

    const {id} = useParams()

    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {variables: { username: user.username, tournamentName: id}})

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        update(){
            props.history.push("/")
        },
        onError(err) {
          console.log(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {tournamentName: tournament?.name}
    })

    

    console.log(error, loading)


    return (
        <div className="tournament">
            <NavBar alterImageRoute/>
            <div className="tournament__main">
                <EditTournament tournament={tournament && tournament}/>
            </div>
            <button onClick={deleteTournament}>Delete Tournament</button>
            <div>
                <h2>Rules</h2>
                <Rules tournamentName={tournament?.name} rules={tournament?.rules}/>
            </div>
            <br></br>
            <div>
                <h2>Restrictions</h2>
                <Restrictions tournamentName={tournament?.name} restrictions={tournament?.restrictions}/>
            </div>
            <br></br>
            <div>
                <h2>Participants</h2>
                <Participants tournamentName={tournament?.name} participants={tournament?.participants}/>
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
  }
}
`

const DELETE_TOURNAMENT_QUERY = gql`
mutation($tournamentName: String!){
    deleteTournament(tournamentName: $tournamentName){
        res
    }
}
`


export default Tournament

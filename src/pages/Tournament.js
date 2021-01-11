import React, {useState, useContext} from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';

function Tournament() {

    const [rulesOpen, setRulesOpen] = useState(false)
    const [restrictionsOpen, setRestrictionsOpen] = useState(false)
    const [participantsOpen, setParticipantsOpen] = useState(false)
    const [newRule, setNewRule] = useState("")

    const { user } = useContext(AuthContext);

    const { loading, error, data: { getTournament: tournament } = {}} = useQuery(FETCH_TOURNAMENT_QUERY, {variables: { username: user.username, tournamentName: "hello"}})


    return (
        <div>
            <h1>{tournament && tournament[0].name}</h1>
            <div className="tournament__edit">
                <div className="tournament__edit-tab">
                    <h1 onClick={() => setRulesOpen(prev => !prev)}>Add Rule</h1>
                    {rulesOpen && 
                    <form>
                        <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="Rule.." name="rule" type="text"/>
                        <button type="submit" >Submit</button>
                    </form>
                    }
                </div>
                <div className="tournament__edit-tab">
                    <h1 onClick={() => setRestrictionsOpen(prev => !prev)}>Add Restriction</h1>
                    {restrictionsOpen && 
                    <div>
                        <input placeholder="Restriction.." name="restriction" type="text"/>
                        <button>Submit</button>
                    </div>
                    }
                </div>
                <div className="tournament__edit-tab">
                    <h1 onClick={() => setParticipantsOpen(prev => !prev)}>Add Participant</h1>
                    {participantsOpen && 
                    <div>
                        <input placeholder="Participant.." name="participant" type="text"/>
                        <button>Submit</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

const FETCH_TOURNAMENT_QUERY = gql`
  query($username: String!, $tournamentName: String!){
  getTournament(username: $username, tournamentName: $tournamentName){
    name
    username
    rules
  }
}
`

const ADD_RULE = gql`
mutation($tournamentName: String, $rule: String!){
  addRule(tournamentName: $tournamentName, rule: $rule){
    name
    username
    rules
  }
}
`

export default Tournament

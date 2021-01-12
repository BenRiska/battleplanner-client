import React, {useState, useContext} from 'react'
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
import { useMutation} from '@apollo/react-hooks';

function EditTournament({tournament}) {

    const [rulesOpen, setRulesOpen] = useState(false)
    const [restrictionsOpen, setRestrictionsOpen] = useState(false)
    const [participantsOpen, setParticipantsOpen] = useState(false)
    const [newRule, setNewRule] = useState("")
    const [newRestriction, setNewRestriction] = useState("")
    const [newParticipant, setNewParticipant] = useState("")

    const { user } = useContext(AuthContext);

    const [addRule] = useMutation(ADD_RULE, {
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
          },
        variables: {username: user.username, tournamentName: tournament?.name, rule: newRule}
    })

    const [addRestriction] = useMutation(ADD_RESTRICTION, {
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
          },
        variables: {tournamentName: tournament?.name, restriction: newRestriction}
    })

    const [addParticipant] = useMutation(ADD_PARTICIPANT, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournament?.name, name: newParticipant}
    })

    const executeAddRule = () => {
        if(newRule.length > 0){
        addRule()
        }
    }

    const executeAddRestriction = () => {
        if (newRestriction.length > 0){
            addRestriction()
        }
    }

    const executeAddParticipant = () => {
        if(newParticipant.length > 0){
            addParticipant()
        }
    }

    return (
        <div>
            <div className="tournament__edit">
                <div className="tournament__edit-tab">
                    <h1 onClick={() => setRulesOpen(prev => !prev)}>Add Rule</h1>
                    {rulesOpen && 
                    <form>
                        <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="Rule.." name="rule" type="text"/>
                        <button type="submit" onClick={executeAddRule} >Submit</button>
                    </form>
                    }
                </div>
                <br></br>
                <div className="tournament__edit-tab">
                    <h1 onClick={() => setRestrictionsOpen(prev => !prev)}>Add Restriction</h1>
                    {restrictionsOpen && 
                    <form>
                        <input value={newRestriction} onChange={e => setNewRestriction(e.target.value)} placeholder="Restriction.." name="restriction" type="text"/>
                        <button onClick={executeAddRestriction}>Submit</button>
                    </form>
                    }
                </div>
                <br></br>
                <div className="tournament__edit-tab">
                    <h1 onClick={() => setParticipantsOpen(prev => !prev)}>Add Participant</h1>
                    {participantsOpen && 
                    <form>
                        <input value={newParticipant} onChange={e => setNewParticipant(e.target.value)} placeholder="Participant.." name="participant" type="text"/>
                        <button onClick={executeAddParticipant}>Submit</button>
                    </form>
                    }
                </div>
            </div>
        </div>
    )
}

const ADD_RULE = gql`
mutation($username: String!, $tournamentName: String!, $rule: String!){
    addRule(username: $username, tournamentName: $tournamentName, rule: $rule){
    name
    username
    rules
  }
}
`

const ADD_RESTRICTION = gql`
mutation($tournamentName: String!, $restriction: String!){
    addRestriction(tournamentName: $tournamentName, restriction: $restriction){
    name
    username
    rules
    restrictions
  }
}
`

const ADD_PARTICIPANT = gql`
mutation($tournamentName: String!, $name: String!){
    addParticipant(tournamentName: $tournamentName, name: $name){
    name
    username
    rules
    restrictions
    participants {
        name
        status
    }
  }
}
`

export default EditTournament

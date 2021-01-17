import React, {useContext, useState} from 'react'
import Rule from './Rule'
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
import { useMutation} from '@apollo/react-hooks';



function Rules({rules, tournamentName, hidden}) {

    const [newRule, setNewRule] = useState("")
    const [showForm, setShowForm] = useState(false)

    const { user } = useContext(AuthContext);

    const [addRule] = useMutation(ADD_RULE, {
        onError(err) {
            console.log(err);
          },
        variables: {username: user.username, tournamentName: tournamentName, rule: newRule}
    })

    const executeAddRule = () => {
        if(newRule.length > 0){
        addRule()
        }
    }

    return (
        <div className="rules">
            { !hidden && (<div className="editTournament__form-container">
                <img onClick={() => setShowForm(prev => !prev)} className={showForm ? "form-active" : null} src="../close.svg" alt="close icon"/>
                {showForm &&
                (<form className="editTournament__form">
                    <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="Rule.." name="rule" type="text"/>
                    <button type="submit" onClick={executeAddRule}>Submit</button>
                </form>)
                }
            </div>)}
            {rules && rules.map(rule => (
            <Rule key={rule} rule={rule} hidden={hidden} tournamentName={tournamentName}/>
            ))}
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

export default Rules

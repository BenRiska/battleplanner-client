import React, {useState} from 'react'
import Rule from './Rule'
import { useMutation} from '@apollo/react-hooks';
import {ADD_RULE, FETCH_TOURNAMENT_QUERY} from "../utils/queries"



function Rules({rules, tournamentName, hidden}) {

    const [newRule, setNewRule] = useState("")
    const [showForm, setShowForm] = useState(false)

    const [addRule] = useMutation(ADD_RULE, {
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_TOURNAMENT_QUERY,
                variables: {tournamentName}
            })
            data.getTournament = result.data.addRule
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data,
                variables: {tournamentName}
            })
            setNewRule("")
        },
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, rule: newRule}
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
                (<div className="editTournament__form">
                    <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="Rule.." name="rule" type="text"/>
                    <button type="submit" onClick={executeAddRule}>Submit</button>
                </div>)
                }
            </div>)}
            {rules && rules.map(rule => (
            <Rule key={rule} rule={rule} hidden={hidden} tournamentName={tournamentName}/>
            ))}
        </div>
    )
}


export default Rules

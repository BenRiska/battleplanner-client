import React, {useState} from 'react'
import Rule from './Rule'
import { useMutation} from '@apollo/react-hooks';
import {ADD_RULE, FETCH_TOURNAMENT_QUERY} from "../utils/queries"



function Rules({rules, tournamentName}) {

    const [newRule, setNewRule] = useState("")

    const [addRule] = useMutation(ADD_RULE, {
        update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.addRule},
                variables: {tournamentName}
            })
            setNewRule("")
        },
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournamentName, rule: newRule.trim()}
    })

    const executeAddRule = () => {
        if(newRule.length > 0){
        addRule()
        }
    }

    return (
        <div className="preGameInfo__column">
            <div className="preGameInfo__form">
                <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="Rule.." name="rule" type="text"/>
                <img onClick={executeAddRule} src="../yellow-cross.svg" alt="add icon"/>
            </div>
            {rules && rules.map(rule => (
            <Rule key={rule} rule={rule} tournamentName={tournamentName}/>
            ))}
        </div>
    )
}


export default Rules

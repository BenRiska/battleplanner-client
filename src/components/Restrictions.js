import React, {useState} from 'react'
import { useMutation} from '@apollo/react-hooks';
import {ADD_RESTRICTION, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

import Restriction from './Restriction';

function Restrictions({restrictions, tournamentName, hidden}) {

    const [newRestriction, setNewRestriction] = useState("")
    const [showForm, setShowForm] = useState(false)

    const [addRestriction] = useMutation(ADD_RESTRICTION, {
        update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.addRestriction},
                variables: {tournamentName}
            })
            setNewRestriction("")
        },
        onError(err) {
            alert(err)
          },
        variables: {tournamentName: tournamentName, restriction: newRestriction}
    })

    const executeAddRestriction = () => {
        if (newRestriction.length > 0){
            addRestriction()
        }
    }

    return (
        <div className="restrictions">
            { !hidden && (<div className="editTournament__form-container">
            <img onClick={() => setShowForm(prev => !prev)} className={showForm ? "form-active" : null} src="../close.svg" alt="close icon"/>
            {showForm &&
            (<div className="editTournament__form">
                <input value={newRestriction} onChange={e => setNewRestriction(e.target.value)} placeholder="Restriction.." name="restriction" type="text"/>
                <button onClick={executeAddRestriction}>Submit</button>
            </div>)
            }
            </div>)}
            {restrictions && restrictions.map(restriction => (
                <Restriction key={`restriction = ${restriction}`} tournamentName={tournamentName} hidden={hidden} restriction={restriction}/>
            ))}
        </div>
    )
}


export default Restrictions

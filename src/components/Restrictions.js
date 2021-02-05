import React, {useState} from 'react'
import { useMutation} from '@apollo/react-hooks';
import {ADD_RESTRICTION, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

import Restriction from './Restriction';

function Restrictions({restrictions, tournamentName}) {

    const [newRestriction, setNewRestriction] = useState("")

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
        <div className="preGameInfo__column">
            <h2>Restrictions</h2>
            <div className="preGameInfo__form">
                <input value={newRestriction} onChange={e => setNewRestriction(e.target.value)} placeholder="Restriction.." name="restriction" type="text"/>
                <img onClick={executeAddRestriction} src="../green-cross.svg" alt="add icon"/>
            </div>
            {restrictions && restrictions.map(restriction => (
                <Restriction key={`restriction = ${restriction}`} tournamentName={tournamentName} restriction={restriction}/>
            ))}
        </div>
    )
}


export default Restrictions

import React, {useState} from 'react'
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';

import Restriction from './Restriction';

function Restrictions({restrictions, tournamentName}) {

    const [newRestriction, setNewRestriction] = useState("")
    const [showForm, setShowForm] = useState(false)

    const [addRestriction] = useMutation(ADD_RESTRICTION, {
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
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
            <div className="editTournament__form-container">
            <img onClick={() => setShowForm(prev => !prev)} className={showForm ? "form-active" : null} src="../close.svg" alt="close icon"/>
            {showForm &&
            (<form className="editTournament__form">
                <input value={newRestriction} onChange={e => setNewRestriction(e.target.value)} placeholder="Restriction.." name="restriction" type="text"/>
                <button onClick={executeAddRestriction}>Submit</button>
            </form>)
            }
            </div>
            {restrictions && restrictions.map(restriction => (
                <Restriction key={`restriction = ${restriction}`} tournamentName={tournamentName} restriction={restriction}/>
            ))}
        </div>
    )
}

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


export default Restrictions

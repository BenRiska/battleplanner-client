import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Restrictions({restrictions, tournamentName}) {

    const [selectedRestriction, setSelectedRestriction] = useState("")

    const [deleteRestriction] = useMutation(DELETE_RESTRICTION, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, restriction: selectedRestriction}
    })

    const executeDeleteRestriction = (e) => {
        setSelectedRestriction(e.target.innerHTML)
        setTimeout(deleteRestriction, 1000)
    }

    return (
        <div>
            {restrictions && restrictions.map(restriction => (
                <p onClick={e => executeDeleteRestriction(e)} key={restriction}>{restriction}</p>
            ))}
        </div>
    )
}

const DELETE_RESTRICTION = gql`
  mutation ($restriction: String!, $tournamentName: String!){
  deleteRestriction(restriction: $restriction, tournamentName: $tournamentName){
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

export default Restrictions

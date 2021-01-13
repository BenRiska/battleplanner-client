import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Restriction({restriction, tournamentName}) {

    const [deleteRestriction] = useMutation(DELETE_RESTRICTION, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, restriction: restriction}
    })

    const executeDeleteRestriction = (e) => {
        deleteRestriction()
    }

    return (
        <div>
            <p>
                {restriction}
            </p>
            <button onClick={executeDeleteRestriction}>delete {restriction}</button>
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

export default Restriction

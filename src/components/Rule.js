import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Rule({rule, tournamentName}) {

    const [deleteRule] = useMutation(DELETE_RULE, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, rule: rule}
    })

    return (
        <div>
            <p>{rule}</p>
            <button onClick={deleteRule}>delete {rule}</button>
        </div>
    )
}

const DELETE_RULE = gql`
  mutation ($rule: String!, $tournamentName: String!){
  deleteRule(rule: $rule, tournamentName: $tournamentName){
    name
    username
    rules
    restrictions
    participants{
      name
      status
    }
  }
}`

export default Rule

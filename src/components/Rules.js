import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';


function Rules({rules, tournamentName}) {

    const [selectedRule, setSelectedRule] = useState("")

    const [deleteRule] = useMutation(DELETE_RULE, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, rule: selectedRule}
    })

    const executeDeleteRule = (e) => {
        setSelectedRule(e.target.innerHTML)
        setTimeout(deleteRule, 1000)
    }

    return (
        <div>
            {rules && rules.map(rule => (<p key={rule} onClick={e => executeDeleteRule(e)}>{rule}</p>))}
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
}
`

export default Rules

import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Rule({rule, tournamentName}) {

    const [openDelete, setOpenDelete] = useState(false)

    const [deleteRule] = useMutation(DELETE_RULE, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, rule: rule}
    })

    return (
        <div className="rule">
            <p>{rule}</p>
            <button onClick={() => setOpenDelete(prev => !prev)}>Remove</button>
            {openDelete && (<div className="edit-confirm-box">
              <p>Are you sure?</p>
              <div className="edit-confirm">
                <p onClick={() => setOpenDelete(prev => !prev)}>No</p>
                <p onClick={deleteRule}>Yes</p>
              </div>
            </div>)}
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

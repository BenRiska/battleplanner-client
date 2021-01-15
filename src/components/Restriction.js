import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Restriction({restriction, tournamentName}) {

  const [openDelete, setOpenDelete] = useState(false)

    const [deleteRestriction] = useMutation(DELETE_RESTRICTION, {
        onError(err) {
            console.log(err);
          },
        variables: {tournamentName: tournamentName, restriction: restriction}
    })

    return (
        <div className="restriction">
            <p>
                {restriction}
            </p>
            <button onClick={() => setOpenDelete(prev => !prev)}>Remove</button>
            {openDelete && (<div className="edit-confirm-box">
              <p>Are you sure?</p>
              <div className="edit-confirm">
                <p onClick={() => setOpenDelete(prev => !prev)}>No</p>
                <p onClick={deleteRestriction}>Yes</p>
              </div>
            </div>)}
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

import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {DELETE_RULE, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

function Rule({rule, tournamentName, hidden}) {

    const [openDelete, setOpenDelete] = useState(false)

    const [deleteRule] = useMutation(DELETE_RULE, {
          update(proxy, result){
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.deleteRule},
              variables: {tournamentName}
          })
        },
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournamentName, rule: rule}
    })

    return (
        <div className="rule">
            <p>{rule}</p>
            {!hidden && (<button onClick={() => setOpenDelete(prev => !prev)}>Remove</button>)}
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

export default Rule

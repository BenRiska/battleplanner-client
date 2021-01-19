import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {DELETE_RESTRICTION, FETCH_TOURNAMENT_QUERY} from "../utils/queries"

function Restriction({restriction, tournamentName, hidden}) {

  const [openDelete, setOpenDelete] = useState(false)

    const [deleteRestriction] = useMutation(DELETE_RESTRICTION, {
          update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_TOURNAMENT_QUERY,
                variables: {tournamentName}
            })
            data.getTournament = result.data.deleteRestriction
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data,
                variables: {tournamentName}
            })
        },
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
            {!hidden && (<button onClick={() => setOpenDelete(prev => !prev)}>Remove</button>)}
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




export default Restriction

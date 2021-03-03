import React from 'react'
import {useMutation} from '@apollo/react-hooks';
import { motion } from "framer-motion"
import {DELETE_PARTICIPANT, FETCH_TOURNAMENT_QUERY} from "../utils/queries"
import {fadeInUpMin} from "../utils/animations"

function Participant({participant, tournamentName}) {


    const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
          update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.deleteParticipant},
                variables: {tournamentName}
            })
        },
        refetchQueries: [
          {query: FETCH_TOURNAMENT_QUERY, variables: {tournamentName}}
        ],
        onError(err) {
            alert(err)
          },
        variables: {tournamentName: tournamentName, name: participant.name}
    })


    return (
        <motion.div variants={fadeInUpMin}className="preGameInfo__column-item">
            <p>
              {participant?.name?.length > 14 ? 
              participant?.name?.slice(0, 14) + "..." 
              :
              participant?.name}
            </p>
            <button onClick={deleteParticipant}>Remove</button>
        </motion.div>
    )
}



export default Participant

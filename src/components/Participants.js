import React, {useState} from 'react'
import Participant from './Participant'
import { motion } from "framer-motion"
import { useMutation} from '@apollo/react-hooks';
import {FETCH_TOURNAMENT_QUERY, ADD_PARTICIPANT} from "../utils/queries"
import {stagger} from "../utils/animations"


function Participants({participants, tournamentName}) {

    const [newParticipant, setNewParticipant] = useState("")

    const [addParticipant, {loading: mutationLoading}] = useMutation(ADD_PARTICIPANT, {
        update(proxy, result){
            proxy.writeQuery({
                query: FETCH_TOURNAMENT_QUERY,
                data: {getTournament: result.data.addParticipant},
                variables: {tournamentName}
            })
            setNewParticipant("")
        },
        refetchQueries: [
          {query: FETCH_TOURNAMENT_QUERY, variables: {tournamentName}}
        ],
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournamentName, name: newParticipant.trim()}
    })

    const executeAddParticipant = () => {
        if(newParticipant.length > 0){
            addParticipant()
        }
    }

    return (
        <motion.div variants={stagger} exit={{ opacity: 0 }} className="preGameInfo__column">
            <div className="preGameInfo__form">
                <input value={newParticipant} onChange={e => setNewParticipant(e.target.value)} placeholder="Participant.." name="participant" type="text"/>
                <motion.img whileTap={{ scale: 0.95 }} onClick={executeAddParticipant} src="../red-cross.svg" alt="add icon"/>
            </div>
            {mutationLoading &&(
                <div style={{marginTop: "1rem"}} class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            {participants && participants.map(participant => (
                <Participant key={`participant = ${participant.name}`} participant={participant} tournamentName={tournamentName}/>))}
        </motion.div>
)
}


export default Participants

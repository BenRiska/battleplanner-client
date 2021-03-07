
import React, {useContext} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { motion } from "framer-motion"
import { AuthContext } from '../context/auth';
import {DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY} from "../utils/queries"
import "../styles/tournament/CompletedPage.css"
import {fadeInUpMin, stagger} from "../utils/animations"

function CompletedPage({tournament}) {

    const history = useHistory()

    const { user } = useContext(AuthContext);

    const [deleteTournament] = useMutation(DELETE_TOURNAMENT_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENTS_QUERY,
              data: {getTournaments: result.data.deleteTournament},
              variables: {username: user?.username}
          })
          history.push("/")
      },
        onError(err) {
            alert(err);
          }
    })

    const executeDeleteTournament = () => {
        deleteTournament({variables: {tournamentName: tournament?.name}})
    }

    return (
        <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }} className="completedPage">
            <motion.h1 variants={fadeInUpMin} >{tournament?.name?.length > 14 ? 
              tournament?.name?.slice(0, 14) + ".." 
              :
              tournament?.name}</motion.h1>
            <motion.div variants={fadeInUpMin} className="winnerCard">
                <h2>
                    <p>Congratulations</p>
                    <p>{tournament?.winner?.length > 10 ? 
              tournament?.winner?.slice(0, 10) + ".." 
              :
              tournament?.winner}!</p>
                </h2>
                <img src="../main-char.svg" alt="char logo"/>
            </motion.div>
            <motion.h2 variants={fadeInUpMin} >Participants</motion.h2>
            <motion.div variants={stagger} className="completedPage__grid">
            {tournament?.participants?.map(p => <motion.div variants={fadeInUpMin} >{p?.name?.length > 10 ? 
              p?.name?.slice(0, 14) + ".." 
              :
              p?.name}</motion.div>)}
            </motion.div>
            <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} variants={fadeInUpMin}  onClick={executeDeleteTournament}>Delete</motion.button>
        </motion.div>
    )
}

export default CompletedPage

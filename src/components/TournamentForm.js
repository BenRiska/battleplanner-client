import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import "../styles/home/TournamentForm.css"
import { motion } from "framer-motion"
import {CREATE_TOURNAMENT, FETCH_TOURNAMENTS_QUERY} from "../utils/queries"

// Our custom easing
let easing = [0.6, -0.05, 0.01, 0.99];

// Custom variant
const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing
      }
    }
  };

function TournamentForm() {

    const [tournamentName, setTournamentName] = useState("")

    const { user } = useContext(AuthContext);

    const [createTournament, ] = useMutation(CREATE_TOURNAMENT, {
      update(proxy, result){
        const data = proxy.readQuery({
            query: FETCH_TOURNAMENTS_QUERY,
            variables: {username: user?.username}
        })
          proxy.writeQuery({
            query: FETCH_TOURNAMENTS_QUERY,
            data: {getTournaments: [result.data.createTournament, ...data.getTournaments]},
            variables: {username: user?.username}
        })
        setTournamentName("")
    },
        variables: {tournamentName: tournamentName.trim()},
        onError(err) {
          alert(err);
        }
      });

    function executeQuery(e) {
        if(tournamentName.length > 0){
        createTournament();
        }
      }

    return (
        <motion.div variants={fadeInUp} className="tournamentForm">
                <img src="./home-char.svg" alt="home character icon"/>
                <input value={tournamentName} onChange={e => setTournamentName(e.target.value)}  placeholder="  Tournament Name.." name="name" type="text"/>
                <button onClick={e => executeQuery(e)}>Create</button>
        </motion.div>
    )
}

export default TournamentForm

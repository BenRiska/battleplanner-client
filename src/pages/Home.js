import React, { useContext,} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { motion } from "framer-motion"
import "../styles/home/home.css"
import {FETCH_TOURNAMENTS_QUERY} from "../utils/queries"

import { AuthContext } from '../context/auth';
import Navbar from "../components/NavBar"
import TournamentForm from '../components/TournamentForm';
import TournamentCard from '../components/TournamentCard';
import {stagger} from "../utils/animations"

function Home() {

    const { user } = useContext(AuthContext);

    const { loading,error, data: { getTournaments: tournaments } = {}} = useQuery(FETCH_TOURNAMENTS_QUERY, {
        variables: {username: user?.username}
    })

    if(error) console.log(error)

    return (
        <motion.div exit={{opacity: 0}} initial="initial" animate="animate" className="home"> 
            <Navbar/>
            <TournamentForm/>
            {loading ? (
                <div style={{marginTop: "10rem"}} class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )
            : 
            (
                <motion.div variants={stagger} className="home__grid">
                {tournaments?.map(tournament => <TournamentCard key={tournament?.name} tournament={tournament}/>)
                }
               </motion.div>
            )
            }
        </motion.div>
    )
}


export default Home

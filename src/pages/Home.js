import React, { useContext, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { motion } from "framer-motion"
import axios from "axios"
import "../styles/home/home.css"
import {FETCH_TOURNAMENTS_QUERY} from "../utils/queries"

import { AuthContext } from '../context/auth';
import Navbar from "../components/NavBar"
import TournamentForm from '../components/TournamentForm';
import TournamentCard from '../components/TournamentCard';
import {stagger} from "../utils/animations"

function Home() {

    const { user } = useContext(AuthContext);

    useEffect(async () => {
        // const options = {
        //     headers: {
        //         "x-phantombuster-key": "V9pUmR9qEzvW3p88FhEJ6AfQIq39lYphKy3CIqj51eE",
        //         "Content-Type": "application/json",
        //     },
        // }

        // const res = await axios.post(
        //         "https://api.phantombuster.com/api/v1/agent/8544549666691668/launch",
        //         {"output":"result-object","argument":{"sessionCookie":"AQEDATFGnIsFoMCrAAABeFUmeqMAAAF4eTL-o00AKaf4Ox31kN0J_jFKduoA38UFVgcho-qetOwqjszGQtOMzloD5CKWw_zHk1QVgvpQDrPDb6VfJJ7rA-U9SnLAfDLefX2W9J9yXKUDhqIV-ydFN_yR","searchUrl":"https://www.linkedin.com/search/results/all/?keywords=technology&origin=GLOBAL_SEARCH_HEADER","emailChooser":"phantombuster"}},
        //         options,
        //     )
            

        //     console.log(res.data)
	
    }, [])

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

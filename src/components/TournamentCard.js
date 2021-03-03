import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import "../styles/home/TournamentCard.css"

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


function TournamentCard({tournament}) {
        return (
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }} exit={{opacity: 0}} className="tournamentCard">
                <h2>{tournament?.name.length > 8 ? 
                tournament?.name?.slice(0,8) + ".." : tournament?.name}</h2>
                <motion.div initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }} className="tournamentCard__info">
                    <div className="tournamentCard__left">
                        <img src="./team-icon.svg" alt="team icon"/>
                        <span>{tournament?.participants?.length}</span>
                    </div>
                    <div className="tournamentCard__right">
                        {tournament?.active && 
                        <p className="active-tab">Active</p>}
                        {!tournament?.active && 
                        tournament?.round === 0
                        && 
                        <p className="start-tab">Ready</p>}
                        {!tournament?.active && 
                        tournament?.round > 0
                        && 
                        <p className="complete-tab">Completed</p>
                        }
                        <Link to={`/tournament/${tournament?.name}`}>View</Link>
                    </div>
                </motion.div>
        </motion.div>
    )
}

export default TournamentCard

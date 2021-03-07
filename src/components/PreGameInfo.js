import React, {useContext, useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import { motion } from "framer-motion"
import "../styles/tournament/PreGameInfo.css"
import {START_GAME_QUERY, DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY, FETCH_TOURNAMENT_QUERY} from "../utils/queries"
import Participants from './Participants';
import Rules from "./Rules"
import Restrictions from "./Restrictions"
import {fadeInUpMin, stagger} from "../utils/animations"

function PreGameInfo({tournament}) {

    
    const { user } = useContext(AuthContext);
    const [participantFAQ, setParticipantFAQ] = useState(false)
    const [rulesFAQ, setRulesFAQ] = useState(false)
    const [restrictionFAQ, setRestrictionFAQ] = useState(false)
    const [formState, setFormState] = useState("participant")

    const history = useHistory()

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
        },
        variables: {tournamentName: tournament?.name}
    })

    const [StartGame] = useMutation(START_GAME_QUERY, {
        update(proxy, result){ 
            proxy.writeQuery({
              query: FETCH_TOURNAMENT_QUERY,
              data: {getTournament: result.data.startGame},
              variables: {username: user?.username}
          })
      },
        onError(err) {
            alert(err);
          },
        variables: {tournamentName: tournament?.name}
    })



    const StartTournament = () => {
        if(
            tournament?.participants.length > 1 && 
            tournament?.participants.length % 4 === 0
        ){
            StartGame()
        } else{
            alert("Participant count must be divisible by four.")
        }
    }

    return (
        <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }} className="preGameInfo">
            <motion.div variants={stagger}>
            <motion.div className="preGameInfo__header">
                <motion.h1 variants={fadeInUpMin}>Configure</motion.h1>
                <motion.p variants={fadeInUpMin}>Before we start you must add the following:</motion.p>
                <div className="preGameInfo__tabs">
                    <motion.div variants={fadeInUpMin} whileTap={{ scale: 0.95 }} onClick={() => setParticipantFAQ(prev => !prev)} 
                    style={{background: participantFAQ ? "#f8faff" : ""}}
                    className="preGameInfo__tab">
                            <div className="preGameInfo__tab-title">
                                <h2>Participants</h2>
                                <img src="../red-info.svg" alt="info btn"/>
                            </div>
                            {
                                participantFAQ && 
                                <ul>
                                    <li>- The total participant count must be divisible by 4.</li>
                                    <li>- There is no participant limit.</li>
                                </ul>
                            }
                    </motion.div>
                    <motion.div variants={fadeInUpMin} whileTap={{ scale: 0.95 }} onClick={() => setRulesFAQ(prev => !prev)} 
                    style={{background: rulesFAQ ? "#f8faff" : ""}}
                    className="preGameInfo__tab">
                    <div className="preGameInfo__tab-title">
                                <h2>Rules (Optional)</h2>
                                <img src="../yellow-info.svg" alt="info btn"/>
                            </div>
                            {
                                rulesFAQ && 
                                <ul>
                                    <li>- Define the rules of your tournament so other players can view them.</li>
                                    <li>- There is no rule limit.</li>
                                </ul>
                            }
                    </motion.div>
                    <motion.div variants={fadeInUpMin} whileTap={{ scale: 0.95 }} onClick={() => setRestrictionFAQ(prev => !prev)}
                    style={{background: restrictionFAQ ? "#f8faff" : ""}} 
                    className="preGameInfo__tab">
                    <div className="preGameInfo__tab-title">
                                <h2>Restrictions (Optional)</h2>
                                <img src="../green-info.svg" alt="info btn"/>
                            </div>
                            {
                                restrictionFAQ && 
                                <ul>
                                    <li>- Any restrictions you have defined can be randomly generated.</li>
                                    <li>- There is no restriction limit.</li>
                                </ul>
                            }
                    </motion.div>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={fadeInUpMin} onClick={StartTournament} className="start-tournament-btn">
                Start
                </motion.button>
            </motion.div>
            <motion.div variants={stagger} className="preGame__form-options">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={fadeInUpMin}
                style={{opacity: formState !== "participant" ? 0.6 : 1}} 
                onClick={() => setFormState("participant")}>Participants</motion.span>
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={fadeInUpMin}
                style={{opacity: formState !== "rule" ? 0.6 : 1}}
                onClick={() => setFormState("rule")}>Rules</motion.span>
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={fadeInUpMin}
                style={{opacity: formState !== "restriction" ? 0.6 : 1}}
                onClick={() => setFormState("restriction")}>Restrictions</motion.span>
            </motion.div>
            <div className="preGameForm">
                {formState === "participant" && <Participants tournamentName={tournament?.name} participants={tournament?.participants}/>}

                {formState === "rule" && <Rules tournamentName={tournament?.name} rules={tournament?.rules}/>}

                {formState === "restriction" && <Restrictions tournamentName={tournament?.name} restrictions={tournament?.restrictions}/>}
            </div>
            <button className="delete-tournament-btn" onClick={deleteTournament}>
                Delete
            </button>
            </motion.div>
        </motion.div>
    )
}

export default PreGameInfo

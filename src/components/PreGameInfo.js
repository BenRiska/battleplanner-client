import React, {useContext, useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom"
import { AuthContext } from '../context/auth';
import "../styles/tournament/PreGameInfo.css"
import {START_GAME_QUERY, DELETE_TOURNAMENT_QUERY, FETCH_TOURNAMENTS_QUERY, FETCH_TOURNAMENT_QUERY} from "../utils/queries"
import Participants from './Participants';
import Rules from "./Rules"
import Restrictions from "./Restrictions"


function PreGameInfo({tournament}) {

    
    const { user } = useContext(AuthContext);
    const [participantFAQ, setParticipantFAQ] = useState(false)
    const [rulesFAQ, setRulesFAQ] = useState(false)
    const [restrictionFAQ, setRestrictionFAQ] = useState(false)

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
        <div className="preGameInfo">
            <img className="preGameInfo__char" src="../configure-char.svg" alt="char img"/>

            <div className="preGameInfo__header">
                <h1>Configure</h1>
                <p>Before we start you must add the following:</p>
                <div className="preGameInfo__tabs">
                    <div onClick={() => setParticipantFAQ(prev => !prev)} 
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
                    </div>
                    <div onClick={() => setRulesFAQ(prev => !prev)} 
                    style={{background: rulesFAQ ? "#f8faff" : ""}}
                    className="preGameInfo__tab">
                    <div className="preGameInfo__tab-title">
                                <h2>Rules (Optional)</h2>
                                <img src="../yellow-info.svg" alt="info btn"/>
                            </div>
                            {
                                rulesFAQ && 
                                <ul>
                                    <li>- Define the rules of your tournament so other players may view it on the tournament portal.</li>
                                    <li>- There is no rule limit.</li>
                                </ul>
                            }
                    </div>
                    <div onClick={() => setRestrictionFAQ(prev => !prev)}
                    style={{background: restrictionFAQ ? "#f8faff" : ""}} 
                    className="preGameInfo__tab">
                    <div className="preGameInfo__tab-title">
                                <h2>Restrictions (Optional)</h2>
                                <img src="../green-info.svg" alt="info btn"/>
                            </div>
                            {
                                restrictionFAQ && 
                                <ul>
                                    <li>- Any restrictions you have defined may be randomly generated on request.</li>
                                    <li>- There is no restriction limit.</li>
                                </ul>
                            }
                    </div>
                </div>
                <button onClick={StartTournament} className="start-tournament-btn">
                Start
                </button>
                <button className="delete-tournament-btn" onClick={deleteTournament}>
                Delete
            </button>
            </div>
            <div className="preGameForm">
                <Participants tournamentName={tournament?.name} participants={tournament?.participants}/>
                <Rules tournamentName={tournament?.name} rules={tournament?.rules}/>
                <Restrictions tournamentName={tournament?.name} restrictions={tournament?.restrictions}/>
            </div>
        </div>
    )
}

export default PreGameInfo

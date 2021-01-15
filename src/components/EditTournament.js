import React, {useState} from 'react'
import "../styles/tournament/EditTournament.css"
import Rules from './/Rules';
import Restrictions from './Restrictions';
import Participants from './Participants';

function EditTournament({tournament}) {

    const [openTab, setOpenTab] = useState("participants")

    return (
            <div className="editTournament">
                <div className="editTournament__tabs">
                    <div onClick={() => setOpenTab("participants")} style={{backgroundColor: openTab === "participants" ? "var(--main-dark-color)" : null}} className="editTournament__tab">
                        <img src="../team.svg" alt="tab icon"/>
                    </div>
                    <div onClick={() => setOpenTab("rules")} style={{backgroundColor: openTab === "rules" ? "var(--main-dark-color)" : null}}  className="editTournament__tab">
                        <img src="../rules.svg" alt="tab icon"/>
                    </div>
                    <div onClick={() => setOpenTab("restrictions")} style={{backgroundColor: openTab === "restrictions" ? "var(--main-dark-color)" : null}}  className="editTournament__tab">
                        <img src="../restriction.svg" alt="tab icon"/>
                    </div>
                </div>

                <div className="editTournament__list">
                    {openTab === "participants" && <Participants tournamentName={tournament?.name} participants={tournament?.participants}/>}

                    {openTab === "rules" && <Rules tournamentName={tournament?.name} rules={tournament?.rules}/>}

                    {openTab === "restrictions" && <Restrictions tournamentName={tournament?.name} restrictions={tournament?.restrictions}/>}
                </div>
            </div>
    )
}

export default EditTournament

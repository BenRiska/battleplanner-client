import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import "../styles/NavBar.css"
import { AuthContext } from '../context/auth';


function NavBar({alterImageRoute}) {

  const [popup, setPopup] = useState(false)

  const { logout, user } = useContext(AuthContext);

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="navbar">
          <Link to="/"><img src={alterImageRoute ? "../bp-logo.svg" : "./bp-logo.svg"} alt="icon"/></Link>
          <motion.div  whileTap={{ scale: 0.95 }} onClick={() => setPopup(prev => !prev)} className="nav__box">
            <img src={alterImageRoute ? "../nav-char.svg":"./nav-char.svg"} alt=""/>
          </motion.div>
          {popup && <div className="nav__box-content">
                <h2>{user?.username}</h2>
                <motion.p whileTap={{ scale: 0.95 }} onClick={logout}>Logout</motion.p>
          </div>}
        </motion.div>
        )
}

export default NavBar

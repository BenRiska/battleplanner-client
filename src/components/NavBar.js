import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"
import { AuthContext } from '../context/auth';


function NavBar({alterImageRoute}) {

  const [popup, setPopup] = useState(false)

  const { logout, user } = useContext(AuthContext);

    return (
        <div className="navbar">
          <Link to="/"><img src="./bp-logo.svg" alt="icon"/></Link>
          <div onClick={() => setPopup(prev => !prev)} className="nav__box">
            <img src="./nav-char.svg" alt=""/>
          </div>
          {popup && <div className="nav__box-content">
                <h2>{user?.username}</h2>
                <p onClick={logout}>Logout</p>
          </div>}
        </div>
        )
}

export default NavBar

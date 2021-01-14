import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"
import { AuthContext } from '../context/auth';


function NavBar() {

  const { logout } = useContext(AuthContext);

    return (
        <div className="navbar">
          <div className="navbar__left">
            <img src="./ring.svg" alt="icon"/>
            <h2>Tournament Planner</h2>
          </div>
          <div className="navbar__right">
            <div className="navbar__links">
            <Link to="/">About</Link>
            <p onClick={logout}>Logout</p>
            </div>
            <img src="./ring-right.svg" alt="icon"/>
          </div>
        </div>
        )
}

export default NavBar

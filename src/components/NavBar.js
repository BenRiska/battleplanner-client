import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"
import { AuthContext } from '../context/auth';


function NavBar({alterImageRoute}) {

  const { logout } = useContext(AuthContext);

    return (
        <div className="navbar">
          <div className="navbar__container">
          <div className="navbar__left">
            <img src={alterImageRoute ? "../ring.svg" : "./ring.svg"} alt="icon"/>
            <Link to="/">Tournament Planner</Link>
          </div>
          <div className="navbar__right">
            <div className="navbar__links">
            <Link to="/">Home</Link>
            <p onClick={logout}>Logout</p>
            </div>
            <img src={alterImageRoute ? "../ring-right.svg" : "./ring-right.svg"} alt="icon"/>
          </div>
          </div>
          <div className="mobile__nav">
                <Link to="/">Home</Link>
                <p onClick={logout}>Logout</p>
            
          </div>
        </div>
        )
}

export default NavBar

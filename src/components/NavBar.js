import React, { useContext} from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function NavBar() {

    const { user, logout } = useContext(AuthContext);

    const navBar = user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <br/>
          <Link to="/login">Login</Link>
        </div>
      );
    


    return navBar
}

export default NavBar

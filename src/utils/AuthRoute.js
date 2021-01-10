import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';


function AuthRoute({ component: Component, redirectIfNotSignedIn, ...rest }) {
  const { user } = useContext(AuthContext);

  return redirectIfNotSignedIn ? (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/register" />
      }
    />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
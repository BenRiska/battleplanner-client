import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
  tournaments: null,
  tournament: null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  updateTournament: (newTournament) => {},
  updateTournaments: (newTournaments) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    case "UPDATE_TOURNAMENT":
      return {
        ...state,
        tournament: action.payload
      };
    case "UPDATE_TOURNAMENTS":
      return {
        ...state,
        tournaments: action.payload
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  function updateTournament(newTournament) {
    dispatch({
      type: "UPDATE_TOURNAMENT",
      payload: newTournament
    })
  }

  function updateTournaments(newTournaments) {
    dispatch({
      type: "UPDATE_TOURNAMENTS",
      payload: newTournaments
    })
  }

  return (
    <AuthContext.Provider
      value={{ 
        user: state.user, 
        tournament: state.tournament,
        tournaments: state.tournaments,
        login, 
        logout, 
        updateTournament, 
        updateTournaments }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
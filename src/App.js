import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { AuthProvider } from './context/auth';
import {useState} from "react"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tournament from './pages/Tournament';
import AuthRoute from './utils/AuthRoute';

function App() {

  const [currentTournament, setCurrentTournament] = useState(null)

  console.log(setCurrentTournament)

  return (
    <AuthProvider>
      <Router>
          <Switch>
            <AuthRoute exact setCurrentTournament={setCurrentTournament} redirectIfNotSignedIn path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact redirectIfNotSignedIn path="/tournament/:id" component={Tournament} currentTournament={currentTournament} />
          </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

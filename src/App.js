import { BrowserRouter as Router, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tournament from './pages/Tournament';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <AuthRoute exact redirectIfNotSignedIn path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact redirectIfNotSignedIn path="/tournament/:id" component={Tournament} />
          </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

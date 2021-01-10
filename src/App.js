import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
          <AuthRoute exact redirectIfNotSignedIn path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
      </Router>
    </AuthProvider>
  );
}

export default App;

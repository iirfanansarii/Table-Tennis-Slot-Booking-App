import Home from './containers/Home';
import SignIn from './containers/Signin/SignIn';
import SignUp from './containers/Signup/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { pagePaths } from './utils/constants';
import PrivateRoute from './components/HOC/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={pagePaths.root} exact component={SignIn} />
        <Route path={pagePaths.signUp}  component={SignUp} />
        <PrivateRoute path={pagePaths.home}  component={Home} />
      </Switch>
    </Router>
  );
}

export default App;

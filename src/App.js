import Home from './containers/Home';
import SignIn from './containers/Signin/SignIn';
import SignUp from './containers/Signup/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { pagePaths } from './utils/constants';
import AddNewSlot from './components/AddNewSlot/AddNewSlot';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={pagePaths.root} exact component={SignIn} />
        <Route path={pagePaths.signUp} exact component={SignUp} />
        <Route path={pagePaths.home} exact component={Home} />
        <Route path={pagePaths.addNewSlot} exact component={AddNewSlot} />
      </Switch>
    </Router>
  );
}

export default App;

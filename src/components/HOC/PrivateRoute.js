import { Redirect, Route } from 'react-router';
import { pagePaths } from '../../utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={pagePaths.root} />;
        }
      }}
    />
  );
};

export default PrivateRoute;

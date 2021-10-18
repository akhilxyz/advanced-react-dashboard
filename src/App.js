import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { HOME_ROUTE } from './constants/env.constant';
import { setToken } from './services/Fetch';
import './scss/style.scss';

//loading
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/Login/Login'));

// private route
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(state => state.persist.isLoggedIn);
  const jwtToken = useSelector(state => state.persist.jwtToken);
  // set jwt on Api header
  setToken(jwtToken);
  return ( <Route {...rest} render={props => ( isLoggedIn ? <Component {...props} />
              : <Redirect to={`${HOME_ROUTE}/login`} />
      )} />
  );
};

class App extends Component {
  render() {
    console.clear()
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path={`${HOME_ROUTE}/login`} name="Login Page" render={props => <Login {...props}/>} />
              <PrivateRoute restricted={false} component={TheLayout} path={HOME_ROUTE.HOME_ROUTE} exact />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;

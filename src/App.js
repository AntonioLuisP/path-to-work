import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { AuthProvider } from './context/AuthContext'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/auth/Login'));
const Register = React.lazy(() => import('./views/auth/Register'));
const Error404 = React.lazy(() => import('./views/errors/Error404'));
const Error500 = React.lazy(() => import('./views/errors/Error500'));
const Home = React.lazy(() => import('./views/home/Home'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <AuthProvider>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Error404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Error500 {...props} />} />
              <Route exatc path="/home" name="teste" render={props => <Home {...props} />} />
              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            </Switch>
          </AuthProvider>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

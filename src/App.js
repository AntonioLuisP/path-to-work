import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheApp = React.lazy(() => import('./containers/TheApp'));

// Pages
const Login = React.lazy(() => import('./views/auth/Login'));
const Register = React.lazy(() => import('./views/auth/Register'));
const Home = React.lazy(() => import('./views/home/Home'));
const Social = React.lazy(() => import('./views/social/Social'));

export default function App() {

  const { authUser } = useAuth()

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login"
            render={props => authUser ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} /> : <Login {...props} />}
          />
          <Route exact path="/register" name="Registro"
            render={props => authUser ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} /> : <Register {...props} />}
          />
          <Route exatc path="/social/:id" name="Social" render={props => <Social {...props} />} />
          <Route exatc path="/home" name="teste" render={props => <Home {...props} />} />
          <Route path="/" name="Home" render={props => <TheApp {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}
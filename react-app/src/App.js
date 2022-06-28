import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ServerPage from './components/ServerPage/ServerPage'
import Matrix from './components/Matrix/Matrix';
import SplashPage from './components/SplashPage/SplashPage';
import { authenticate } from './store/session';
import {getAllServers} from './store/servers'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      // await dispatch(getAllServers())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <Matrix />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <Matrix />
          <SignUpForm />
        </Route>
        <Route path='/servers' exact={true}>
          <ServerPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Matrix />
          <NavBar />
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

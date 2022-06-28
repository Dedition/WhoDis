import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ServerPage from './components/ServerPage/ServerPage'
import ServerForm from './components/ServerForm/ServerForm';
import ChannelForm from './components/ChannelForm/ChannelForm';
import Matrix from './components/Matrix/Matrix';
import { authenticate } from './store/session';
//import {getAllServers} from './store/servers'

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
          <LoginForm />
        </Route>
        {/* Matrix component added temporarily for testing matrix rainfall -- Sona */}
        <Route path='/matrix' exact={true}>
          <Matrix />
        </Route>
        <Route path='/sign-up' exact={true}>
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
          <NavBar />
          <h1>My Home Page</h1>
        </Route>
        <Route path='/create-server' exact={true}>
          <ServerForm />
        </Route>
        <Route path='/create-channel' exact={true}>
          <ChannelForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

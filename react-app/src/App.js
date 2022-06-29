import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Channels from './components/Channels/Channels'
function App() {
  const [loaded, setLoaded] = useState(false);
  const [userloaded, setUserLoaded] = useState(false)
  const dispatch = useDispatch();


  const user = useSelector(state => state.session.user)

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
      {user &&
        <ServerPage /> 
      }
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
        <Route path='/servers/@me' exact={true}>
          
        </Route>
        <Route path='/servers/:serverId' exact={true}>
          <ChannelForm></ChannelForm>
          <Channels></Channels>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <NavBar/>
        </Route>
        <Route path='/create-server' exact={true}>
          <ServerForm />
        </Route>
        {/* <Route path='/create-channel' exact={true}>
          <ChannelForm />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

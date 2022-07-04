import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import MainDiscord from './components/MainDiscord/MainDiscord';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import MockChats from './components/MockChats/MockChats';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
     
      <Switch>

        {/* Should Be Protected Route */}
        <Route exact path='/'><LandingPage/></Route>


        <Route exact path='/sign-up'><SignUpPage /></Route>


        <Route exact path='/login'><LoginPage/></Route>


        <Route exact path={['/servers/@me', '/servers/:id', '/servers/:id/:channelId']}><MainDiscord/></Route>


        <ProtectedRoute exact path='/user-profile'><UserProfilePage/></ProtectedRoute>


        <ProtectedRoute exact path='/mock'>
          <MockChats/>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
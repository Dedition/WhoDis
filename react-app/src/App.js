import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import MainDiscord from './components/MainDiscord/MainDiscord';


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

        <ProtectedRoute exact path='/'><LandingPage/></ProtectedRoute>

        <Route exact path='/login'><LoginForm/></Route>


        <Route exact path='/servers/@me'><MainDiscord/></Route>


        <Route exact path='/sign-up'><SignUpForm/></Route>

        <ProtectedRoute exact path='/users/profile'><User/></ProtectedRoute>


        


      </Switch>
    </BrowserRouter>
  );
}

export default App;
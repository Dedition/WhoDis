import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import UserProfile from './components/UserSettings/UserSettings';
import ServerPage from './components/ServerPage/ServerPage'
import ServerForm from './components/ServerForm/ServerForm';
import ChannelForm from './components/ChannelForm/ChannelForm';
import EditServerForm from './components/EditServerForm/EditServerForm';
import EditChannelForm from './components/EditChannelForm/EditChannelForm';
import EditUserForm from './components/EditUserForm/EditUserForm';
import DeleteUser from './components/DeleteUser/DeleteUser';
import DeleteServer from './components/DeleteServer/DeleteServer';
import DeleteChannel from './components/DeleteChannel/DeleteChannel';
import UserSettings from './components/UserSettings/UserSettings';
import Matrix from './components/Matrix/Matrix';
import SplashPage from './components/SplashPage/SplashPage';
import { authenticate, getUsers } from './store/session';
//import {getAllServers} from './store/servers'
import Channels from './components/Channels/Channels'
import Main from './components/Main/Main';
import { Redirect } from 'react-router-dom';
import RightSidebar from './components/RightSidebar/RightSidebar';

// function App() {
//   const [loaded, setLoaded] = useState(false);
//   const [userloaded, setUserLoaded] = useState(false)
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.session.user)
//   useEffect(() => {
//     (async () => {
//       await dispatch(authenticate());
//       setLoaded(true);
//     })();
//   }, [dispatch]);
//   if (!loaded) {
//     return null;
//   }
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path='/login' exact={true}>
//           <Matrix />
//           <LoginForm />
//         </Route>
//         <Route path='/sign-up' exact={true}>
//           <Matrix />
//           <SignUpForm />
//         </Route>
//         <Route path='/' exact={true} >
//           <Matrix />
//           <SplashPage />
//         </Route>
//         <Route path='/servers/@me' exact={true}>
//           <div className='browser-container'>
//             <ServerPage />
//             <Main />
//             <div className='main-sidebar'></div>
//           </div>
//         </Route>
//         <ProtectedRoute path='/users' exact={true} >
//           <div className='browser-container'>
//             <ServerPage />
//             <Main />
//             <div className='main-sidebar'></div>
//             <UsersList />
//           </div>
//         </ProtectedRoute>
//         <ProtectedRoute path='/users/:userId' exact={true} >
//           <div className='browser-container'>
//             <ServerPage />
//             <Main />
//             <User />
//             <div className='main-sidebar'></div>
//           </div>
//         </ProtectedRoute>
//         <Route path='/create-server' exact={true}>
//           <ServerPage />
//           <Main />
//           <ServerForm />
//         </Route>
//         <Route path='/edit-server' exact={true}>
//           <div className='browser-container'>
//             <ServerPage />
//             <Main />
//             <EditServerForm />
//             <div className='main-sidebar'></div>
//           </div>
//         </Route>
//         {/* <Route path='/edit-channel' exact={true}>
//           <EditChannelForm />
//         </Route> */}
//         <Route path='/delete-server' exact={true}>
//           <div className='browser-container'>
//             <ServerPage />
//             <Main />
//             <DeleteServer />
//             <div className='main-sidebar'></div>
//           </div>
//         </Route>
//         {user ? <Route path='/user-profile' exact={true}>
//           <UserSettings />
//         </Route>
//           : <Redirect to="/" />}
//         <Route path='/servers/:serverId'>
//           <ServerPage />
//           <Main />
//           <RightSidebar />
//           {/* <Channels /> */}
//         </Route>
//         {/* <Route path='/:serverId/:channelId/edit'>
//           <DeleteChannel />
//         </Route> */}
//         <Route path='/edit-user'>
//           <EditUserForm />
//         </Route>
//         <Route path='/delete-user'>
//           <DeleteUser />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
// }



function App() {
  const [loaded, setLoaded] = useState(false);
  const [userloaded, setUserLoaded] = useState(false)
  const dispatch = useDispatch();

  const path = useSelector(state => state.globalActions.url)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
      // if (loaded) {
      // await dispatch(getUsers());
      // }
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && path !== 'user-profile' &&
        <div className='browser-container'>
          <ServerPage />
          <Main />
          <div className='main-sidebar'></div>
        </div>
      }
      <Switch>
        <Route path='/login' exact={true}>
          <Matrix />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <Matrix />
          <SignUpForm />
        </Route>
        <Route path='/servers/@me' exact={true}>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {!user &&
            <div>
              <Matrix />
              <SplashPage />
            </div>}
        </Route>
        <Route path='/create-server' exact={true}>
          <ServerForm />
        </Route>
        <Route path='/edit-server' exact={true}>
          <EditServerForm />
        </Route>
        {/* <Route path='/edit-channel' exact={true}>
          <EditChannelForm />
        </Route> */}
        <Route path='/delete-server' exact={true}>
          <DeleteServer />
        </Route>
        {user ? <Route path='/user-profile' exact={true}>
          <UserProfile />
        </Route>
          : <Redirect to="/" />}
        {/* <Route path='/:serverId/:channelId/edit'>
          <DeleteChannel />
        </Route> */}
        <Route path='/edit-user'>
          <EditUserForm />
        </Route>
        <Route path='/delete-user'>
          <DeleteUser />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

// HELLO WORLD 2
export default App;

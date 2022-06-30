import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { signUp } from '../../store/session';

import './UserSettings.css'


const UserProfile = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();


  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/servers/@me`)
  };

  // console.log(user, "THIS IS USER ----------------------");

  return (
    <div className='main-user-div'>
      <div className="logout-div">
        <LogoutButton />
      </div>
      <div className='user-content-div'>
        <h1>My Account</h1>
        {/* <div>
          {user?.profile_pic_url}
        </div> */}
        <div className='user-info-div'>
          <div className='user-name-initial'>
            {user?.username.charAt(0)}
          </div>
          <div className='user-name'>
            {user?.username}
          </div>
          <div className='user-subinfo'>
            <div  className='user=name2'>
              {user?.username}
            </div>
            <div className='user-email'>
              {user?.email}
            </div>
          </div>
        </div>
        <div>
          <button onClick={handleCancelClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}


export default UserProfile;

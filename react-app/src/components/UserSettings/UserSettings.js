import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { signUp } from '../../store/session';

import './UserSettings.css'


const UserProfile = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();


  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   history.push('/servers/@me')
  // };

  // console.log(user, "THIS IS USER ----------------------");

  return (
    <div className='main-user-div'>
      <div className="logout-div">
        <div className='logout-btn'>
          <LogoutButton />
        </div>
      </div>
      <div className='user-content-div'>
        <div className='my-account'>
          <h1>My Account</h1>
        </div>
        {/* <div>
          {user?.profile_pic_url}
        </div> */}
        {/* <div className='darkgrey-background'> */}
        <div className='user-profile-content'>
          {/* <button onClick={handleCancelClick}>
            Back
          </button> */}
          <div className='black-bar'>
            <div className='exit-server-form white-exit'>
              <NavLink to='/servers/@me'>
                x
              </NavLink>
            </div>
          </div>
          <div className='user-top-info'>
            <div className='user-name-initial'>
              {user?.username.charAt(0)}
            </div>
            <div className='user-name'>
              {user?.username}
            </div>
            <div className='edit-user-button'>
              <NavLink to='/edit-user'>
                <button>Edit User Profile</button>
              </NavLink>
            </div>
          </div>
          <div className='user-subinfo'>
            <div className='div-username'>
              <div>UserName</div>
              <div className='username2'>
                {user?.username}
              </div>
            </div>
            <div className='div-email'>
              <div>Email</div>
              <div className='user-email'>
                {user?.email}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div>
        </div>
      </div>
    </div>
  )
}


export default UserProfile;

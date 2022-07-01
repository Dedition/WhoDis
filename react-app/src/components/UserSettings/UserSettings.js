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
            <div className='icon-div'>
              <div className='color-circle'>
                {/* <div className='user-name-initial'>
                  {user?.username.charAt(0)}
                </div> */}
                <i className='fa-brands fa-discord'></i>
              </div>
            </div>
            <div className='user-name'>
              {user?.username}
            </div>
            <NavLink to='/edit-user'>
              <button className='edit-user-button'>Edit User Profile</button>
            </NavLink>
          </div>
          <div className='user-subinfo'>
            <div className='div-username'>
              <div>USERNAME</div>
              <div className='username2'>
                {user?.username}
              </div>
            </div>
            <div className='div-email'>
              <div>EMAIL</div>
              <div className='user-email'>
                {user?.email}
              </div>
            </div>
          </div>
          <NavLink to='/delete-user'>
            <button className='delete-user-button'>Delete User</button>
          </NavLink>
          {/* <div className='delete-user-button'> */}
          {/* </div> */}
        </div>
        {/* </div> */}
        <div>
        </div>
      </div>
    </div>
  )
}


export default UserProfile;

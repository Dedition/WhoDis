import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { signUp } from '../../store/session';


const UserProfile = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();

  // console.log(user, "THIS IS USER ----------------------");

  return (
    <div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <h1>My Account</h1>
        {/* <div>
          {user.profile_pic_url}
        </div> */}
        {/* <div>
          {user.username}
        </div>
        <div>
          {user.username}
        </div>
        <div>
          {user.email}
        </div> */}
      </div>
    </div>
  )
}


export default UserProfile;

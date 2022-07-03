import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'
import LoginForm from './auth/LoginForm';
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  return (
    <nav className='main-navbar'>
      <div className='logo-main-nav' onClick={() => history.push('/')}>
        <p>Logo</p>
      </div>

      <div className={!user  ? 'center-links-nav' : 'center-links-nav moved-github'}>
        <a href='https://github.com/Dedition/WhoDis/wiki'>
           <i className="fa-brands fa-github github-icon">
            </i>
            </a>
        
      </div>

{ !user ?
      <div className='login-signup-container'> 
      <div className='login-button-nav' onClick={() => history.push('/login')}>
        <p>Login</p>
      </div>

      <div className='signup-button-nav' onClick={() => history.push('/sign-up')}>
        <p>Register</p>
      </div>
      </div> : 
      <div className='front-arrow-container'>
          <i className="fas fa-arrow-right front-arrow" onClick={() => history.push('/servers/@me')}>Back to WhoDis?</i>
      </div>
}
    </nav>
  );
}

export default NavBar;
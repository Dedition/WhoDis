
import React  from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navBar.css'

/*************************************************************************************************************************/

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
    <div className="SplashPage">
        <div className="Nav-bar">
          <nav className="Navigation-bar">
              <NavLink id="homeBtn" to='/' exact={true} activeClassName='active' >
                WhoDis?
              </NavLink>
              <a id="nav-github"
                href='https://github.com/Dedition/WhoDis/wiki'
                target="_blank"
                rel="noopener noreferrer" >
                GitHub
              </a>
              <NavLink id="nav-about" to='/about' exact={true} activeClassName='active' >
                About Us
              </NavLink>
              <NavLink id="nav-login" to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
          </nav>
        </div>

        <div className='splash-text'>
          <div className='splash-slogan'>
            <h1>Slogan</h1>
          </div>
          <div className='splash-para'>
            <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
          </div>
        </div>

        <div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
          <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>
        </div>

          { user && 
              <LogoutButton />
          }
    </div>
  );
}


/*************************************************************************************************************************/

export default NavBar;

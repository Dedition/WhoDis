
import React  from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';

import './navBar.css'
import logo from './logo.png'

/*************************************************************************************************************************/

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
        <div className="Nav-bar">
          <nav className="Navigation-bar">
            <div id='splash-logo'>
              <img id="splash-imgLogo" src={logo} />
              <NavLink id="splash-homeBtn" to='/' exact={true} activeClassName='active' >
                WhoDis?
              </NavLink>
            </div>
            <div className='splash-github'>
              <a id="nav-github"
                href='https://github.com/Dedition/WhoDis/wiki'
                target="_blank"
                rel="noopener noreferrer" >
                GitHub
              </a>
            </div>
            <div>
              <NavLink id="nav-about" to='/about' exact={true} activeClassName='active' >
                About Us
              </NavLink>
            </div>
            <div>
              <NavLink id="nav-login" to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
          </nav>
        </div>
  );
}


/*************************************************************************************************************************/

export default NavBar;

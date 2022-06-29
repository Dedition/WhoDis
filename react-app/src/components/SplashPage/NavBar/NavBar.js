
import React  from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

import './navBar.css'
import logo from './logo.png'

/*************************************************************************************************************************/

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
        <div className="Nav-bar">
          <div className="splash-nav">
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

          <div className="splash-text-container">
              <h1 id="splash-title" >New Chat, Who Dis???</h1>
              <p id="splash-txt">
                  ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
              </p>
          </div>
        </div>
  );
}


/*************************************************************************************************************************/

export default NavBar;

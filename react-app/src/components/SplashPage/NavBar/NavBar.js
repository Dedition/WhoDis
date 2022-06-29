
import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { demo } from '../../../store/session';
import './navBar.css'
import logo from './logo.png'

/*************************************************************************************************************************/

const NavBar = () => {

  const [email] = useState('');
  const [password] = useState('');

  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const demoSubmit = (e) => {
    e.preventDefault();
    history.push("/servers");
    return dispatch(demo(email, password));
  };

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

          <div className='splash-middle-container'>
            <div className="splash-text-container">
                <h1 id="splash-title" >New Chat, Who Dis???</h1>
                <p id="splash-txt">
                    ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                </p>
            </div>
            <div className="splash-auth-container">
              <span className='splash-demo'>
                <button onClick={demoSubmit}>Guest User</button>
              </span>
              <NavLink id='splash-signup' to='/sign-up' exact={true} activeClassName='active'>
                Register
              </NavLink>
            </div>
          </div>

          <div className='splash-border'></div>

          <div className='splash-footer'>
            <div className='splash-developers'>
              <h3>Developers</h3>
              <a href="https://github.com/weiqimei">Weiqi Mei</a>
              <a href="https://github.com/sonajasani">Sona Jasani</a>
              <a href="https://github.com/Dedition">Leo Lad</a>
              <a href="https://github.com/AnthonyRo1">Anthony Rodriguez</a>
            </div>
            <span className="splash-resources">
              <h3>Resources</h3>
              <div>Flask</div>
              <div>React</div>
              <div>Redux</div>
              <div>SQLAlchemy</div>
            </span>
          </div>

        </div>
  );
}


/*************************************************************************************************************************/

export default NavBar;

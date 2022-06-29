
import React  from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

import './splashPage.css'

/********************************************************************************************************************/

const SplashPage = () => {
    return (
        <div className='splash-main-page'>
            <NavBar />
            {/* <div className='splash-text'>
                <div className='splash-slogan'>
                    <div>
                        New Chat, Who Dis???
                    </div>
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
            </div> */}
        </div>
    )
}

/********************************************************************************************************************/

export default SplashPage;
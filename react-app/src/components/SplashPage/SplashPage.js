
import React  from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import './splashPage.css'
// import SplashText from './SplashText/SplashText';

/********************************************************************************************************************/

const SplashPage = () => {
    return (
        <div className='splash-main-page'>
            <NavBar />
            {/* 

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
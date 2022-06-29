
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
        </div>
    )
}

/********************************************************************************************************************/

export default SplashPage;
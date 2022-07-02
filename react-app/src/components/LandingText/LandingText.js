import './landingtext.css'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { login } from '../../store/session';
import LogoutButton from '../auth/LogoutButton';

const LandingText = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const loginDemo = async (e) => {
        e.preventDefault();
        dispatch(login('demo@aa.io', 'password'));
        console.log("SUCCESSFULLY LOGIN")
        history.push('/')
    };



    return (
        <div className='landing-center-container'>
            <div className='landing-heading'>
                <p>Welcome to the world of WhoDis?</p>
            </div>
            <div className='landing-subheading'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className='landing-demo'>
                <button className='demo-btn' onClick={loginDemo}>Experience The Anonymity</button>
            </div>

        <LogoutButton/>

        </div>
    )
}

export default LandingText;
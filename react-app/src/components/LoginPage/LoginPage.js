import './loginpage.css';
import LoginForm from '../auth/LoginForm';
import { useHistory } from 'react-router-dom';



const LoginPage = () => {
    const history = useHistory();
    return (
        <div className='login-container'>
            <div className='back-btn-signup'>
                <i className="fa-solid fa-arrow-left-long back-arrow" onClick={() => history.push('/')}>Back To Home</i>
            </div>
        <LoginForm/>
        </div>
    )
}

export default LoginPage;
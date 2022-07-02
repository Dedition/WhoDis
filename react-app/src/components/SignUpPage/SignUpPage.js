import SignUpForm from "../auth/SignUpForm";
import './signuppage.css';
import { useHistory } from "react-router-dom";
const SignUpPage = () => {
    const history = useHistory();
    return (
        <div className='signup-container'>
            <div className='back-btn-signup'>
                <i className="fa-solid fa-arrow-left-long back-arrow" onClick={() => history.push('/')}>Back To Home</i>
            </div>
            <SignUpForm/>
        </div>
    )
}

export default SignUpPage;
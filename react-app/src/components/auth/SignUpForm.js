import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { signUp, demo } from '../../store/session';
import "./auth.css"
import logo from '../SplashPage/NavBar/logo.png'                                               // auth.css page created for auth components -Sona

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/servers/@me' />;
  }

  // Created a Demo login feature - Sona
  const demoSubmit = (e) => {
    e.preventDefault();
    history.push("/servers/@me");
    return dispatch(demo(email, password));
  };
  

  return (
    <div className='authenticate-class'>
      <div className='auth-form-div'>
        <NavLink to='/'>
          <img id="signup-imgLogo" src={logo} />
        </NavLink>
        <h1>Create Account!</h1>
        <form onSubmit={onSignUp}>
          <div className='auth-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='auth-form'>
            <div className='auth-username'>
              <label>User Name</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='auth-email'>
              <label>Email</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='auth-password'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='auth-confirm-password'>
              <label>Confirm Password</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className='submit'>
              <button type='submit'>Sign Up</button>
            </div>
            {/* Guest user button and NavLink to /login created -- Sona */}
            <div className='before-demo'>  
            </div>
            <div className='auth-demo'>
              <button onClick={demoSubmit}>Guest User</button>
            </div>
            <div className='auth-link'>
              <span>Already have an Account? </span>
              <NavLink id='link' to='/login' exact={true} activeClassName='active'>
                  Log In
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

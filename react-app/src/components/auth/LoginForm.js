import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { login, demo } from '../../store/session';
import "./auth.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
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
        <h1>Welcome Back!</h1>
        <form onSubmit={onLogin}>
          <div className='auth-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='auth-form'>
            <div className='auth-email'>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                // placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='auth-password'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                // placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className='submit'>
              <button id='auth-submit' type='submit'>Login</button>
            </div>
            {/* Guest user button and NavLink to /sign-up created -- Sona */}
            <div className='before-demo'>
            </div>
            <div className='auth-demo'>
              <button onClick={demoSubmit}>Guest User</button>
            </div>
            <div className='auth-link'>
              <span>Need an Account? </span>
              <NavLink id='link' to='/sign-up' exact={true} activeClassName='active'>
                Register
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signupform.css'
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('') 
  const [profilePic, setProfilePic] = useState('') 



  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const onSignUp = async (e) => {
    const err = [];
    e.preventDefault();

    if (username.length <= 3) err.push('Username: Username must be at least 4 characters');

    if (email.length <= 0 || !email.includes('@')) err.push('Email: You must enter a valid email')

    if (password.length <= 7) err.push('Password: Password must be at least 8 characters.')

    if (password != repeatPassword) err.push('Password: Passwords do not match')

     const data = await dispatch(signUp(username, email, password, bio, profilePic));
      //! if data leak persists, check here
      if (data && data.includes('username: Username is already in use.')) {
        err.push('Username: Username is already in use.')
      }

    if (data && data.includes('email: Email address is already in use.')) {
      err.push('Email: Email is already in use')
    }
      setErrors(err)
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-container'>
      <h1 className='signup-text'>Signup</h1>
    <form onSubmit={onSignUp} className='signup-form'>
      <div className='signup-errors'>
        {errors.length > 0 && errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div className='signup-username'>
        <label htmlFor='username'></label>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>

      <div className='signup-email'>
        <label htmlFor='email'></label>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
        <label htmlFor='bio'></label>
      <div className='signup-bio'>
        <input
          name='bio'
          type='text'
          placeholder='Bio *Optional'
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </div>

      <div className='signup-profile-pic'>
          <label htmlFor='profile_pic_url'></label>
        <input
          name='profile_pic_url'
          type='url'
          placeholder='Profile Picture *Optional'
          onChange={(e) => setProfilePic(e.target.value)}
          value={profilePic}
        />
      </div>

      <div className='signup-password'>
        <label htmlFor='password'></label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>

      <div className='signup-confirm-password'>
        <input
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
        ></input>
      </div>
      <div className='signup-btn-box'>
      <button className='signup-btn' type='submit'>Sign Up</button>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
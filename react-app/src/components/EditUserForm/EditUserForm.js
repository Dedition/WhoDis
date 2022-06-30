import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { editSingleUser } from '../../store/session';

const EditUserForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const user = useSelector(state => state.session.user);
  console.log(user, "THIS IS USER ----------------------");
  const history = useHistory();
  const dispatch = useDispatch();

  const onEdit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email
    }
    const updatedUser = await dispatch(editSingleUser(user.id, data));
    if (updatedUser) {
      history.push('/user-profile');
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onEdit}>
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
        <div className='submit'>
          <button type='submit'>Edit</button>
        </div>
      </form>
    </div>
  )
};

export default EditUserForm;

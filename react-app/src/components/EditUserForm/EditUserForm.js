import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { editSingleUser } from '../../store/session';
const EditUserForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  const userId = useSelector(state => state.session.user.id);
  // console.log(user, "THIS IS USER ----------------------");
  const history = useHistory();
  const dispatch = useDispatch();

    const onEdit = (e) => {
      e.preventDefault();
      const data = {
        username,
        email
      }

      const updatedUser = dispatch(editSingleUser(userId, data));
      if (updatedUser) {
        history.push('/user-profile');
      }
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
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              ></input>
            </div>
          </div>
          <div className='auth-email'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
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

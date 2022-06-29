import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';

import { addSingleChannel } from '../../store/channels'



const ChannelForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const reset = () => {
    setName('');
  }

  const submitForm = (e) => {
    e.preventDefault();
    const payload = {
      name
    };
    const newChannel = dispatch(addSingleChannel(payload));
    if (newChannel) {
      history.push(`/servers`);
      reset();
    }
  }

  return (
    <div className='modal'>
      <div className='form'>
      <form onSubmit={submitForm}>
          <div className='create-text'>Create New Channel!</div>
        <label htmlFor='name'>Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
    </div>
  )

}


export default ChannelForm;

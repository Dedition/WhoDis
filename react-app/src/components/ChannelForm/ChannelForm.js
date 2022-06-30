import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink, useParams } from 'react-router-dom';

import { addSingleChannel, getAllChannels } from '../../store/channels'
import "./ChannelForm.css"


const ChannelForm = () => {
  // const { serverId } = useParams();
 
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const url = window.location.href.split('/')
  const serverId = url[url.length - 1]

  const history = useHistory();
  const dispatch = useDispatch();

  const reset = () => {
    setName('');
  }


  const submitForm = async(e) => {
    e.preventDefault();
    const payload = {
      name
    };
    const newChannel = await dispatch(addSingleChannel(payload, serverId));
    if (newChannel) {
      history.push(`/servers/${serverId}`);
      reset();
    }
  }

  

  return (
    <div className='modal'>
      <div className='form'>
        <form onSubmit={submitForm}>
          <div className='exit-server-form'>

            <NavLink to={`/servers/${serverId}`}><div className='exit'>x</div></NavLink>
          </div>
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

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink, useParams } from 'react-router-dom';

import { addSingleChannel } from '../../store/channels'
import "./ChannelForm.css"


const ChannelForm = ({ setForm }) => {
  // const { serverId } = useParams();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const url = window.location.href.split('/')
  const serverId = url[url.length - 1]
  console.log(serverId)

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
    console.log(payload)
    const newChannel = dispatch(addSingleChannel(payload, serverId));
    if (newChannel) {
      history.push(`/servers/${serverId}`);
      setForm(true);
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
      {/* animation */}
      {/* <div class="left">
        <div class="cat">
          <div class="ears1"></div>
          <div class="head1">
            <div class="eyes1"></div>
            <div class="nose1"></div>
          </div>
          <div class="body1">
            <div class="left-paw1"></div>
            <div class="right-paw1"></div>
          </div>
          <div class="tail1"></div>
          <div class="PRlaptop">
            <div class="PRscreen"></div>
            <div class="PRkeyboard"></div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="dog">
          <div class="ears2"></div>
          <div class="head2">
            <div class="eyes2"></div>
            <div class="nose2"></div>
          </div>
          <div class="body2">
            <div class="left-paw2"></div>
            <div class="right-paw2"></div>
          </div>
          <div class="tail2"></div>
          <div class="ORlaptop">
            <div class="ORscreen"></div>
            <div class="ORkeyboard"></div>
          </div>
        </div>
      </div> */}




    </div>
  )

}


export default ChannelForm;

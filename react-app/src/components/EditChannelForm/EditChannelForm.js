import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink, useParams } from 'react-router-dom';
import { editSingleChannel, getChannel } from '../../store/channels'


const EditChannelForm = () => {
  // const [errors, setErrors] = useState([]);


  // const [name, setName] = useState("");
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const { channelId } = useParams();


  // const reset = () => {
  //   setName('');
  // }

  // useEffect(() => {
  //   dispatch(getChannel(channelId));
  // }, [dispatch]);

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     name
  //   };
  //   const newChannel = dispatch(editSingleChannel(payload));
  //   if (newChannel) {
  //     history.push(`/servers/${serverId}`);
  //     reset();
  //   }
  // }

  return (
    <div></div>
    // <div className='modal'>
    //   <div className='form'>
    //     <form onSubmit={submitForm}>
    //       <div className='exit-server-form'>

    //         <NavLink to='/servers'><div className='exit'>x</div></NavLink>
    //       </div>
    //       <div className='create-text'>Edit Channel!</div>
    //       <label htmlFor='name'>Name</label>
    //       <input
    //         name="name"
    //         type="text"
    //         placeholder="Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         required
    //       />
    //       <button type="submit">
    //         Edit
    //       </button>
    //     </form>
    //   </div>
    // </div>
  )

}



export default EditChannelForm;

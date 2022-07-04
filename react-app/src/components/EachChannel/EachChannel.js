import './eachchannel.css'
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { removeSingleChannel, editSingleChannel } from '../../store/channels';
import { getChannelMessages } from '../../store/channel_messages';
import { Modal } from '../../context/Modal';
import { getSingleChannel } from '../../store/check_home';
import { NavLink } from 'react-router-dom';
const EachChannel = ({channelInfo, isOwner, serverId}) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [toggleForm, setToggleForm] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const err = [];
        if (name.length <= 4) err.push('Channel name must be at least 5 character.')
        setErrors(err);
    }, [name])





    const submitEdit = (e) => {
        e.preventDefault()
        const payload = {
            name
        }
        dispatch(editSingleChannel(channelInfo?.id, payload))
        setToggleForm(false);
    }
    const submitDelete = (e) => {
        e.preventDefault()
        dispatch(removeSingleChannel(channelInfo?.id))
        setToggleDelete(false);
    }




    const displayChannel = () => {
        dispatch(getSingleChannel(channelInfo?.id))
        dispatch(getChannelMessages(channelInfo?.id))
    }
    const triggerEditActions = () => {
        dispatch(getSingleChannel(channelInfo?.id))
        setToggleForm(true);
    }
    const triggerDeleteActions = () => {
        console.log(channelInfo?.id)
        dispatch(getSingleChannel(channelInfo?.id))
        setToggleDelete(true);
    }

    return (
    <>
        <div className='channel-container' onClick={() => displayChannel()}>
            <div className='channel-each'>
                <NavLink to={`/servers/${serverId}/${channelInfo?.id}`}>
                <p id='channel-name'>{channelInfo?.name}</p>
                </NavLink>
                { isOwner &&
                        <i className="fas fa-edit edit-btn-channel" onClick={() => triggerEditActions()}></i>
                }

                { toggleForm && 
                <Modal onClose={() => setToggleForm(false)}>
                <div className='edit-channel-container'>
                    <h2>Edit Channel Name</h2>

                    <ul>
                    {
                        errors.length > 0 && errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))
                    }
                    </ul>

                    <form className='edit-channel-form' onSubmit={submitEdit}>
                        <div className='edit-channel-name'>
                        <label htmlFor='name'></label>
                        <input
                        placeholder={channelInfo?.name}
                        name='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        >
                        </input>
                        <button type='submit' id='submit-btn-channel' disabled={!!errors.length}>Submit</button>
                        </div>
                    </form>
                </div>
                </Modal>
                }

                { isOwner &&
                <i className="fas fa-trash 
                delete-channel-icon" onClick={() => triggerDeleteActions()}></i>}


                { toggleDelete && 
                    <Modal onClose={() => setToggleDelete(false)}>
                        <div className='delete-channel-container'>
                    <form className='delete-channel-form' onSubmit={submitDelete}>
                        <p id='delete-channel-text'>Are you sure you want to delete this channel?</p>
                        <button type='submit' className='delete-btn-channel'>Delete</button>
                    </form>
                </div>
                    </Modal>
                }


            </div>
        </div>
    </>
    )
}

export default EachChannel;
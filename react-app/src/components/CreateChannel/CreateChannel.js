import './createchannel.css'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import { addSingleChannel } from '../../store/channels'
import { useHistory } from 'react-router-dom'
import { Modal } from '../../context/Modal'
const CreateChannel = ({serverId, setToggleForm, toggleForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('')


    const submitForm = (e) => {
        e.preventDefault();
        const payload = {
            name
        }
        dispatch(addSingleChannel(serverId, payload))
        history.push(`/servers/${serverId}`)
        setName('')
        setToggleForm(false)
    }

    return (
        <div className='create-channel-container'>
            <i class="fas fa-plus add-channel-btn" onClick={() => setToggleForm(true)}>Add Channel</i>
            { toggleForm &&
            <Modal onClose={() => setToggleForm(false)}>
            <div>
            <form className='create-channel-form' onSubmit={submitForm}>
                <p id='create-channel-title'>Create A Channel</p>
                <label htmlFor='name'></label>
                <input 
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></input>
                <button type='submit' id='create-channel-btn'>Create Channel</button>
            </form>
            </div>
            </Modal>
            }
        </div>
        
    )
}

export default CreateChannel
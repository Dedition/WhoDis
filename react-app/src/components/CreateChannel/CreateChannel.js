import './createchannel.css'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import { addSingleChannel } from '../../store/channels'
import { useHistory } from 'react-router-dom'

const CreateChannel = ({serverId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('')
    const [toggleForm, setToggleForm] = useState(false);


    const submitForm = (e) => {
        e.preventDefault();
        const payload = {
            name
        }
        dispatch(addSingleChannel(serverId, payload))
        history.push(`/servers/${serverId}`)
        setName('')
        setToggleForm(!toggleForm)
    }

    return (
        <div className='create-channel-container'>
            <i className="fas fa-wave-square wave-btn" onClick={() => setToggleForm(!toggleForm)}></i>
            { toggleForm &&
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
            }
        </div>
    )
}

export default CreateChannel
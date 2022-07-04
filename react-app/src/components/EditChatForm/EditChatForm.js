import './editchatform.css'
import { useEffect, useState } from 'react'
import { updateMessage } from '../../store/channel_messages';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';

const EditChatForm = ({messageId, toggleForm}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const err = [];
        if (content.length <= 0) err.push('Message cannot be empty')
        setErrors(err)
    }, [content])

    const submitChat = (e) => {
        e.preventDefault();
        const payload = {
            content
        }
        dispatch(updateMessage(messageId, payload))
        toggleForm(false);
    }


    return (

        <div className='edit-chat-container'>
            <ul className='chat-error'>
            { errors.length > 0 && errors.map((err, i) => (
                <li key={i}>{err}</li>
            ))
            }
            </ul>
            
            <form className='edit-chat-form' onSubmit={submitChat}>
                <label htmlFor='content'></label>
                <input
                name='content'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                >
                </input>
                <button id='edit-chat-btn' type='submit' disabled={!!errors.length}>Edit Chat</button>
            </form>
        </div>
    )
}


export default EditChatForm;
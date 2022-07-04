import './chatfield.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannelMessage } from '../../store/channel_messages';

const ChatField = ({channelId}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');

    const submitChat = (e) => {
        e.preventDefault();
        const payload = {
            content
        }
        dispatch(createChannelMessage(channelId, payload))
    }
    return (
        <div className='chat-field-container'>
            <form className='chat-field-form' onSubmit={submitChat}>
                <label htmlFor='content'></label>
                <input className='chat-field-input'
                name='content'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                >
                </input>
                <button id='chat-submit'></button>
            </form>
        </div>
    )
}

export default ChatField;
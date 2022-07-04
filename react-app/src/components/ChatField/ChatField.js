import './chatfield.css';
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannelMessage, deleteMessage } from '../../store/channel_messages';


let socket;

const ChatField = ({ channelId }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const err = [];
        // TODO Adding validation for the input field so that the
        // TODO text can't be sent empty nor longer than necessary
        if (content.length > 100) err.push('Message is too long. Must be less than 100 characters');
        setErrors(err);
        socket = io();

        socket.on("chat", (chat) => {

            const content = chat.msg
            const payload = {
                content
            }
            dispatch(createChannelMessage(channelId, payload))
        })

        return (() => {
            socket.disconnect();
        })
    }, [dispatch, channelId, content])

    // const deleteMessage = async(e, msg) => {
    //     e.preventDefault();
    //     const payload = {
    //         msg
    //     }

    //     socket.emit(payload);
    //     dispatch(deleteMessage(p))
    // }

    // channelId in dependency

    const submitChat = (e) => {
        e.preventDefault();

        socket.emit("chat", { user: user?.username, msg: content })

        setContent("")
    }
    return (
        <div className='chat-field-container'>
            <form className='chat-field-form' onSubmit={submitChat}>
                {errors.map((error, index) => {
                    return <p key={index}>{error}</p>

                }
                )}
                <label htmlFor='content'></label>
                <input className='chat-field-input'
                    name='content'
                    type='text'
                    value={content}
                    placeholder='Please enter your message first :)'
                    onChange={(e) => setContent(e.target.value)}
                    autoComplete='off'
                >
                </input>
                <button id='chat-submit' disabled={content.length === 0}></button>
            </form>
        </div>
    )
}

export default ChatField;

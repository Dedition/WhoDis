import './chats.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EachChat from '../EachChat/EachChat';
import { getAllUsers } from '../../store/allusers';

const Chats = ({channelId}) => {
    const dispatch = useDispatch();
    const currentState = useSelector((state) => state.channelMessages);
    useEffect(() => {
        dispatch(getAllUsers())
    }, [channelId, currentState]);

    const allMessages = useSelector((state) => state.channelMessages);
    const messages = Object.values(allMessages);


    return (
        <div className='chats-container'>
            {
                messages.map((msg, i) => (
                <EachChat key={i} msg={msg} channelId={channelId}/>
                ))
            }
        </div>
    )
}

export default Chats;
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getAllServers } from '../../store/servers';
// import { getChannelMessages } from '../../store/channel_messages';
// import { getAllChannels } from '../../store/channels';
// import "./ChatField.css";

// const ChatField = () => {
//     const { serverId } = useParams();
//     const dispatch = useDispatch();
//     const servers = useSelector(state => state.servers);

//     const [message, setMessage] = useState();
//     const [server, setServer] = useState(null);
//     const [channel, setChannel] = useState(null);

//     useEffect(() => {
//         dispatch(getChannelMessages)
//     }, [dispatch]);

//     return {

//     }

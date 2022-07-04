import './chatarea.css'
import {useParams} from 'react-router-dom';
import ChatField from '../ChatField/ChatField';
import Chats from '../Chats/Chats';
import { useSelector } from 'react-redux';
const ChatArea = () => {
    const {id} = useParams();


    const allServers = useSelector((state) => state.servers);
    const servers = Object.values(allServers);
    const currentServer = servers.find(server => server?.id == id);
    const bannerUrl = currentServer?.banner_url;
    console.log(id);

    return (
        // if id exists, display all chats
        <>
        
        <div className='chat-area-container'>
            <div className='chat-area-header'></div>
            <div className='chat-area-main'>
                <Chats channelId={id}/>
            </div>
            <div className='chat-area-footer'>
                <ChatField channelId={id}/>
            </div>
        </div>
        </>
    )
}
export default ChatArea;
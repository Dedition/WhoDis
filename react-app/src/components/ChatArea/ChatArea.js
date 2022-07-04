import './chatarea.css'
import {useParams} from 'react-router-dom';
import ChatField from '../ChatField/ChatField';
import Chats from '../Chats/Chats';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
const ChatArea = () => {
    const {id, channelId} = useParams();

    const allServers = useSelector((state) => state.servers);
    const servers = Object.values(allServers);
    const currentServer = servers.find(server => server?.id == id);
    const bannerUrl = currentServer?.banner_url;
    return (
        // if id exists, display all chats
        <>
        
        <div className='chat-area-container'>
            <div className='chat-area-header'></div>
            <div className='chat-area-main'>
                <Chats channelId={id}/> :
            </div>
            { channelId !== undefined ?
            <div className='chat-area-footer'>
                <Route path='/servers/:id/:channelId'>
                <ChatField channelId={channelId}/>
                </Route>
            </div> :
            <div>
               <p> visit a channel to send a message!</p>
            </div>
            }
        </div>
        </>
    )
}
export default ChatArea;
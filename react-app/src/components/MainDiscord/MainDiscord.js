import './maindiscord.css'
import ChatArea from '../ChatArea/ChatArea';
import RightSideBar from '../RightSideBar/RightSideBar';
import LeftSideBar from '../LeftSideBar/LeftSideBar';

const MainDiscord = () => {
    return (
        <div className='main-discord-container'>
            <LeftSideBar/>
            <ChatArea/>
            <RightSideBar/>
        </div>
    )
}


export default MainDiscord;
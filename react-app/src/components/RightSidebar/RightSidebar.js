import './rightsidebar.css'
import Channels from '../Channels/Channels'
import LogoutButton from '../auth/LogoutButton'
const RightSidebar = () => {
    return (
        <div className='right-sidebar'>
            <div className='rs-content'>
            <div className='channel-name'>
                <p id='channel-title'>Channel Name</p>
            </div>
            <div className='create-channel'>
                <p className='text-chnl'>Text Channel</p>
                <button id='channel-create-btn'>
                    <i className="fa-solid fa-plus channel-add"></i>
                </button>
            </div>
            <Channels/>
            </div>
        </div>
    )
}


export default RightSidebar
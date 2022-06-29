import './rightsidebar.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Channels from '../Channels/Channels';
import LogoutButton from '../auth/LogoutButton';
import ChannelForm from '../ChannelForm/ChannelForm';
import { useParams } from 'react-router-dom';

const RightSidebar = () => {
    // const { serverId } = useParams();
    const url = window.location.href.split('/')
    const serverId = url[url.length - 1]
    const [form, setForm] = useState(false);
    const showForm = () => setForm(!form);

    const currentUrl = useSelector(state => state.globalActions)
    const path = currentUrl?.url
    if (path == undefined) {
        console.log("TRUE")
    }
    // const currentPath = path[path.length - 1]
    // console.log(currentPath)
    

    return (
        <div className='right-sidebar'>
            <div className='rs-content'>
                <div className='channel-name'>
                    <p id='channel-title'>Channel Name</p>
                </div>
                <div className='create-channel'>
                    <p className='text-chnl'>Text Channel</p>
                    <button onClick={showForm} id='channel-create-btn'>
                        <i className="fa-solid fa-plus channel-add"></i>
                    </button>
                </div>
                {form &&
                    <ChannelForm serverId={serverId} form={setForm} />
                } 

                <Channels />
            </div>
        </div>
    )
}


export default RightSidebar

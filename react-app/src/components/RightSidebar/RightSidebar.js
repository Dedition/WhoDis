import './rightsidebar.css';
import { useState } from 'react';
import Channels from '../Channels/Channels';
import LogoutButton from '../auth/LogoutButton';
import ChannelForm from '../ChannelForm/ChannelForm';

const RightSidebar = () => {
    const [form, setForm] = useState(false);

    const showForm = () => setForm(!form);



    return (
        <div onClick={showForm} className='right-sidebar'>
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
                    <ChannelForm />
                }
                <Channels />
            </div>
        </div>
    )
}


export default RightSidebar

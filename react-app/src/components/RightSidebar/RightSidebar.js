import './rightsidebar.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Channels from '../Channels/Channels';
import LogoutButton from '../auth/LogoutButton';
import ChannelForm from '../ChannelForm/ChannelForm';
import { useParams } from 'react-router-dom';

const RightSidebar = () => {

    const [form, setForm] = useState(false);
    const showForm = () => setForm(!form);



    
    
    // path !== undefined && path.includes('@me') ? setTitle('Direct Messages') : setTitle('Text Channels')

    return (
        <div className='right-sidebar'>
            <div className='rs-content'>
                <div className='channel-name'>
                    <p id='channel-title'>Channel Name</p>
                </div>
                <div className='title-sb'>
                    <p className='text-chnl'>Text Channel</p>
                    <button onClick={showForm} id='channel-create-btn'>
                        <i className="fa-solid fa-plus channel-add"></i>
                    </button>
                </div>
                {form &&
                    <ChannelForm form={setForm} />
                } 
                <Route path='/servers/:serverId'>
                <Channels />
                </Route>
            </div>
        </div>
    )
}


export default RightSidebar

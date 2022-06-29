import './rightsidebar.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Channels from '../Channels/Channels';
import LogoutButton from '../auth/LogoutButton';
import ChannelForm from '../ChannelForm/ChannelForm';
import { useParams } from 'react-router-dom';

const RightSidebar = (showDms) => {

    // use the current path to display either 'Direct Messages' or 'Text Channels' as the right sidebar title
    const url = window.location.href.split("/")
    const path = url[url.length -1]

    // Display Form (state)
    const [form, setForm] = useState(false);
    const showForm = () => setForm(!form);

    // either change state or show dm's 
    // the <Channel/> component displays either DM's or Channels 
    const stateChange = useSelector(state => state.channels)
    const [dms, setDms] = useState()

    // useEffect checks the current state of channels to re-render this component
    useEffect(() => {
    // if path == '@me' render DMS List, else render Channels List 
    return () => {
        if (path === '@me') {
            setDms(false)
        } else {
            setDms(true)
        }
    }
    }, [stateChange])


 
    const allServers = useSelector(state => state.servers);
    const servers = Object.values(allServers)
    const currentServer = servers.find(server => server.id == path)

    return (
        <div className='right-sidebar'>
            <div className='rs-content'>
                <div className='channel-name'>
                    <p id='channel-title'>{path == '@me' ? 'Direct Messages' : currentServer?.name}</p>
                </div>
                <div className='title-sb'>
                    <p className='text-chnl'>{path == '@me' ? 'Direct Messages' : 'Text Channel'}</p>
                    { path !== '@me' &&
                    <button onClick={showForm} id='channel-create-btn'>
                        <i className="fa-solid fa-plus channel-add"></i>
                    </button>
                    }
                </div>
                {form &&
                    <ChannelForm form={setForm} />
                } 
                
                <Route path='/servers/:serverId'>
                    
                <Channels showDms={dms}/>
                    
                </Route>
            </div>
        </div>
    )
}


export default RightSidebar

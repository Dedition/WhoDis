import './rightsidebar.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Channels from '../Channels/Channels';
import LogoutButton from '../auth/LogoutButton';
import ChannelForm from '../ChannelForm/ChannelForm';

const RightSidebar = () => {
    // const { serverId } = useParams();
    // console.log(serverId, "THIS IS SERVER ID ----------------------")

    const [form, setForm] = useState(false);

    const showForm = () => setForm(!form);

    // const server = useSelector((state) => state.servers);
    // console.log(server.name, "THIS IS SERVER NAME ----------------------")


    return (
        <div className='right-sidebar'>
            <div className='rs-content'>
                <div className='channel-name'>
                    <p id='channel-title'>SERVER NAME</p>
                </div>
                <NavLink to='/edit-server'>
                    <button>
                        EDIT SERVER
                    </button>
                </NavLink>
                <div className='create-channel'>
                    <p className='text-chnl'>Text Channel</p>
                    <button onClick={showForm} id='channel-create-btn'>
                        <div className="channel-add">+</div>
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

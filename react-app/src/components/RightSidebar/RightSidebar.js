import './rightsidebar.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, useHistory } from 'react-router-dom';
import Channels from '../Channels/Channels';
import LogoutButton from '../auth/LogoutButton';
import ChannelForm from '../ChannelForm/ChannelForm';
import { getAllChannels, addSingleChannel } from '../../store/channels';
const RightSidebar = (showDms) => {

    // use the current path to display either 'Direct Messages' or 'Text Channels' as the right sidebar title
    const url = window.location.href.split("/")
    const path = url[url.length - 1]
    const serverId = path



    const [form, setForm] = useState(false);

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
    // CHANNEL FORM   
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const reset = () => {
        setName('');
        setForm(false)
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const payload = {
            name
        };
        const newChannel = await dispatch(addSingleChannel(payload, serverId));
        if (newChannel) {
            setForm(!form)
            history.push(`/servers/${serverId}`);
            reset();
        }
    }
// CHANNEL FORM 

    const user = useSelector((state) => state.session.user)

    const allServers = useSelector(state => state.servers);
    const servers = Object.values(allServers)
    const currentServer = servers.find(servers => servers.id == serverId)

    const serverOwner = currentServer?.owner_id
    const isOwner = () => {
        if (serverOwner == user.id) {
            return true
        }
        return false
    }

    return (
        <div className='right-sidebar'>
            <div className='rs-content'>
                <div className='channel-name'>
                    <p id='channel-title'>{path == '@me' ? 'Direct Messages' : currentServer?.name}</p>
                   {/* Class Name for Edit and Delete Buttons Changed */}
                    <div className='edit-delete-server-title'>
                        <NavLink to='/edit-server'>
                            <i
                                className="fas fa-edit edit__btn"> 
                            </i>
                        </NavLink>
                        <NavLink to='/delete-server'>
                            <i
                                className="fas fa-trash-alt delete__btn">

                            </i>
                        </NavLink>
                    </div>
                </div>
                <div className='title-sb'>
                    <p className='text-chnl'>{path == '@me' ? 'Direct Messages' : 'CHANNELS'}</p>
                    { serverOwner == user.id &&
                        <button id='channel-create-btn' disabled={serverOwner !== user.id} onClick={() => setForm(true)}>
                            <div className="channel-add" >+</div>
                        </button>
                    }
                </div>

                {/* CHANNEL FORM */}
                {form &&
                    <div className='modal'>
                        <div className='form'>
                            <form onSubmit={submitForm}>
                                <div className='exit-server-form'>

                                    <NavLink to={`/servers/${serverId}`}><div className='exit' onClick={() => reset()}>x</div></NavLink>
                                </div>
                                <div className='create-text'>Create New Channel!</div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                                <button type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                }
                {/* CHANNEL FORM */}

                {/* DISPLAY ALL CHANNELS */}
                <Route path='/servers/:serverId'>
                    <Channels />
                </Route>
                {/* DISPLAY ALL CHANNELS */}
            </div>
        </div>
    )
}


export default RightSidebar

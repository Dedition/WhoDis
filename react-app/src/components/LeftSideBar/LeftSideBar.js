import './leftsidebar.css'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
import {getAllServers} from '../../store/servers';
import {getAllChannels} from '../../store/channels';
import EachServer from '../EachServer/EachServer';
import { useParams, useHistory } from 'react-router-dom';
import ServerForm from '../ServerForm/ServerForm';
import EditServer from '../EditServer/EditServer';
import EachChannel from '../EachChannel/EachChannel';
import CreateChannel from '../CreateChannel/CreateChannel';
import { Redirect } from 'react-router-dom';

const LeftSideBar = () => {
    const {id} = useParams()
    const currentServerId = id;

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getAllServers());

        if (currentServerId) {
            dispatch(getAllChannels(currentServerId))
        }
    }, [dispatch, currentServerId])


    const user = useSelector((state) => state.session.user);
    const allServers = useSelector((state) => state.servers);
    const servers = Object.values(allServers);


    const server = servers.find(server => server?.id === +currentServerId)

    const isOwner = server?.owner_id === user?.id;
    const allChannels = useSelector((state) => state.channels)
    const channels = Object.values(allChannels);

    return (
        <div className='left-sidebar-container'>
            <div className='left-half-sb'>
                <div className='left-half-sb-home top-sb' onClick={() => history.push('/servers/@me')}>
                    <div className='home-btn-sb' style={{
                        background: `url(${user?.profile_pic_url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                </div>
                <div className='divider-container'>
                    <div className='divider'></div>
                </div>
            <div className='server-list-container'>
                {   servers.map((server, i) => (
                    <EachServer key={i} server={server}/>
                ))}
            </div>
                <ServerForm/>
            </div>
            
            <div className='right-half-sb'>
                <div className='right-half-sb-title top-sb' style={{
                    background: `url(${server?.banner_url})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    { currentServerId ?
                    <div className='server-name'>
                    <p id='server-title'>{server?.name}</p>
                    </div> :
                    <div className='right-half-username'>
                        {user?.username}
                    </div>
                    }
                    { isOwner &&
                    <EditServer serverInfo={server}/>
                    }
                </div>

                { isOwner &&
                <div className='add-channel-container'>
                    <CreateChannel serverId={currentServerId} />
                </div>
                }

                { currentServerId &&
                <div className='channels-container'>
                    { channels.map((channel, i) => (
                        <EachChannel key={i} channelInfo={channel} isOwner={isOwner} serverId={currentServerId}/>
                    ))}
   
                </div>
                }
                <div className={currentServerId ? "sidebar-profile-icons" : 'sidebar-profile-icons icons-bottom'}>

                    <i class="fa-solid fa-microphone sidebar-profile-icon"></i>


                    <i class="fa-solid fa-headset sidebar-profile-icon"></i>


                    <i class="fa-solid fa-cog sidebar-profile-icon" onClick={() => history.push('/user-profile')}></i>
                </div>
            </div>
        </div>
    )
}


export default LeftSideBar
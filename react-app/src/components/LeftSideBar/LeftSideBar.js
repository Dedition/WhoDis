import './leftsidebar.css'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import {getAllServers} from '../../store/servers';
import {getAllChannels} from '../../store/channels';
import EachServer from '../EachServer/EachServer';
import { useParams, useHistory } from 'react-router-dom';
import ServerForm from '../ServerForm/ServerForm';
import EditServer from '../EditServer/EditServer';


const LeftSideBar = () => {

    const {id} = useParams()
    const currentServerId = id;

    const dispatch = useDispatch();
    const history = useHistory();
    const prevServers = useSelector(state => state.servers)
    const prevServerList = Object.values(prevServers)

    useEffect(() => {
        dispatch(getAllServers());

        if (currentServerId) {
            dispatch(getAllChannels(currentServerId))
        }
    }, [dispatch, currentServerId, prevServerList.length])


    const user = useSelector((state) => state.session.user);
    const allServers = useSelector((state) => state.servers);
    const servers = Object.values(allServers);
    const server = servers.find(server => server.id == currentServerId)

    const isOwner = server?.owner_id == user.id;

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
                    <EachServer server={server}/>
                ))}
            </div>
                <ServerForm/>
            </div>
            
            <div className='right-half-sb'>
                <div className='right-half-sb-title top-sb'>
                    { currentServerId && 
                    
                    <div className='server-name'>
                    <p id='server-title'>{server?.name}</p>
                    </div>
                    }
                    { isOwner &&
                    <EditServer serverInfo={server}/>
                    }
                </div>
                <div className='channels-container'>

                </div>
            </div>
        </div>
    )
}


export default LeftSideBar
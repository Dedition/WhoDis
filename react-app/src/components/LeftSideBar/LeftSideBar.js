import './leftsidebar.css'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {getAllServers} from '../../store/servers';
import {getAllChannels} from '../../store/channels';
import EachServer from '../EachServer/EachServer';
import { useParams, useHistory } from 'react-router-dom';

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
    const server = servers.find(server => server.id == currentServerId)


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
            </div>
            <div className='right-half-sb'>
                <div className='right-half-sb-title top-sb'>
                    { currentServerId && server?.name}
                </div>
                <div className='channels-container'>

                </div>
            </div>
        </div>
    )
}


export default LeftSideBar
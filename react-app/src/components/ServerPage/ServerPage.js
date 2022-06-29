import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink, useParams } from 
'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import {getAllServers} from '../../store/servers'
import {getAllChannels} from '../../store/channels'
import RightSidebar from '../RightSidebar/RightSidebar';
import "./ServerPage.css"
import { confirmUrlAction } from '../../store/check_home';

const ServerPage = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllServers());
    }, []);

    const user = useSelector((state) => state.session.user);
    const allServers = useSelector((state) => state.servers);
    
    const servers = Object.values(allServers);

    const [props, setProps] = useState(false)



    return (
        <div className='sidebar'>
            <div className='server-nav'>
                <div>
                    <div className='server-bubble'>
                        <NavLink id='server-nav' className='home-button' to='/servers/@me'>Home</NavLink>
                    </div>
                    <div className='server-bubble'>
                    {servers.map((server, i) => (
                    <NavLink key={i} id='server-nav' to={`/servers/${server.id}`}>
                        <div key={server.id} className='server-nav-a'>{server.name[0]}
                        </div>
                    </NavLink>
                        ))}
                    </div>
                </div>
                {/* <LogoutButton/>    */}
            </div>
            <RightSidebar showDms={props}/>
            </div>
        
        
    )
}

export default ServerPage;

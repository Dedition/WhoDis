import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink, useParams } from
    'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { getAllServers } from '../../store/servers'
import { getAllChannels } from '../../store/channels'
import RightSidebar from '../RightSidebar/RightSidebar';
import "./ServerPage.css"


const ServerPage = () => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllServers());
    }, [dispatch]);

    const user = useSelector((state) => state.session.user);
    console.log(user.username, "THIS IS USER ----------------------")
    const allServers = useSelector((state) => state.servers);

    const servers = Object.values(allServers);
    // const allChannels = useSelector((state) => state.channelReducer);
    // const channels = Object.values(allChannels)


    return (
        <>
            <div className='sidebar'>
                <div className='server-nav'>
                    <div>
                        <div className='server-bubble'>
                            <NavLink id='server-nav' className='home-button' to='/servers/@me'>Home</NavLink>
                        </div>
                        <div className='server-bubble'>
                            {servers.map((server, i) => (
                                <NavLink key={i} id='server-nav' to={`/servers/${server.id}`}>
                                    <div key={server.id} className='server-nav-a'>{server.name[0]}</div></NavLink>
                            ))}
                        </div>
                        <div className='server-bubble'>
                            <NavLink id='server-nav' className='add-server' to='/create-server' exact={true}>
                                <p>+</p>
                            </NavLink>
                        </div>
                    </div>
                    {/* <ul>
                    {channels.map(channel => {
                        return <li key={channel.id}>{channel.name}</li>
                    })}
                </ul> */}
                    <LogoutButton />


                    {/* <NavLink to='/create-channel' exact={true}>
                    <p>create channel</p>
                </NavLink> */}
                    {/* <div>
                        {user.profile_pic_url}
                    </div> */}

                    {/* user bar */}
                    {/* <div className='user-bar'>
                        <div className='server-nav-a'>
                            {user.username.charAt(0)}
                        </div>
                        <div>
                            {user.username}
                        </div>
                    </div> */}
                </div>
                <RightSidebar />
            </div>
        </>

    )
}

export default ServerPage;

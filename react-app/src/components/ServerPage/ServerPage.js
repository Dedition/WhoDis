import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink, useParams } from 'react-router-dom';

import * as serversActions from '../../store/servers'
import * as channelsActions from '../../store/channels'

import "./ServerPage.css"


const ServerPage = () => {
    const serverId = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(serversActions.getAllServers());
        dispatch(channelsActions.getAllChannels(serverId)); // need to get serverId
    }, [dispatch]);

    const user = useSelector((state) => state.session.user);
    const allServers = useSelector((state) => state.servers);
    console.log(allServers)
    const servers = Object.values(allServers)
    console.log(servers)

    const allChannels = useSelector((state) => state.channelReducer);
    const channels = Object.values(allChannels)


    return (
        <>
            <div className='server-nav'>
                <div>
                    <div className='server-bubble'>
                        <NavLink id='server-nav' className='home-button' to='/'>Home</NavLink>
                    </div>
                    <div className='server-bubble'>
                        {servers.map(server => {
                            return <NavLink id='server-nav' to={`/servers/${server.id}`}><div key={server.id} className='server-nav-a'>{server.name.charAt(0)}</div></NavLink>
                        })}
                    </div>
                    <div className='server-bubble'>
                        <NavLink id='server-nav' className='add-server' to='/create-server' exact={true}>
                            <p>+</p>
                        </NavLink>
                    </div>
                </div>
                <ul>
                    {channels.map(channel => {
                        return <li key={channel.id}>{channel.name}</li>
                    })}
                </ul>
                <NavLink to='/create-channel' exact={true}>
                    <p>create channel</p>
                </NavLink>
            </div>
        </>
    )
}

export default ServerPage;

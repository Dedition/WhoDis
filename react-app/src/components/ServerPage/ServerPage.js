import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';

import * as serversActions from '../../store/servers'
import * as channelsActions from '../../store/channels'

import "./ServerPage.css"


const ServerPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(serversActions.getAllServers());
        dispatch(channelsActions.getAllChannels(1)); // need to get serverId
    }, [dispatch]);

    const user = useSelector((state) => state.session.user);
    const allServers = useSelector((state) => state.servers);
    const servers = Object.values(allServers)

    const allChannels = useSelector((state) => state.channelReducer);
    const channels = Object.values(allChannels)


    return (
        <div className='server-nav'>
            <ul className='server-nav-a'>
                {servers.map(server => {
                    return <NavLink to={`/servers/${server.id}`}><li key={server.id}>{server.name}</li></NavLink>
                })}
            </ul>
            <NavLink to='/create-server' exact={true}>
                <p>create server</p>
            </NavLink>
            <ul>
                {channels.map(channel => {
                    return <li key={channel.id}>{channel.name}</li>
                })}
            </ul>
            <NavLink to='/create-channel' exact={true}>
                <p>create channel</p>
            </NavLink>
        </div>
    )
}

export default ServerPage;

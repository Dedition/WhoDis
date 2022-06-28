import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';

import * as serversActions from '../../store/servers'


const ServerPage =() => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(serversActions.getAllServers());
    }, [dispatch]);
    
    const user = useSelector((state) => state.session.user);
    const allServers = useSelector((state) => state.servers);
    console.log(allServers, "..........................................")
    const servers = Object.values(allServers)
    
    return (
        <div>
            <ul>
                {servers.map(server => {
                    return <li key={server.id}>{server.name}</li>
                })}
            </ul>
        </div>
    )
}

export default ServerPage;


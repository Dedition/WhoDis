// This Component Displays ALL of the channels belonging to a specific server, as this component only displays at the route 'servers/:serverId'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllChannels } from '../../store/channels'
import { getSingleServerId } from '../../store/check_home'
import './channels.css'

const Channels = () => {
    const dispatch = useDispatch()
    const { serverId } = useParams();
    console.log(serverId)

    // const { server } = useParams();


    useEffect(() => {
        if (serverId !== '@me') {
        dispatch(getAllChannels(serverId))
        dispatch(getSingleServerId(serverId))
        }
        return () => {
        }
    }, [dispatch, serverId])

    const allChannels = useSelector(state => state.channels)
    const channels = Object.values(allChannels)

    const allServers = useSelector(state => state.servers)


    const servers = Object.values(allServers);

    const oneServer = servers.filter(server => server.id)


    return (
        <>
            <div className='channel-name'>
                <p id='channel-title'>{servers.name}</p>
            </div>
            <div className='channels-container'>
                {channels.map((channel, i) => (
                    <div className='channel-each' key={i}>
                        {channel?.name}
                        <NavLink to='/edit-channel'>
                            <i
                                className="fas fa-edit edit__btn">
                                {/* EDIT CHANNEL */}
                            </i>
                        </NavLink>
                        <NavLink to='/delete-channel'>
                        <i
                            className="fas fa-trash-alt delete__btn">
                        </i>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}



export default Channels

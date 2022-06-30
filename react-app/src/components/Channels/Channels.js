// This Component Displays ALL of the channels belonging to a specific server, as this component only displays at the route 'servers/:serverId'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllChannels } from '../../store/channels'
import { getServer } from '../../store/servers'
import './channels.css'

const Channels = () => {
    const dispatch = useDispatch()
    const { serverId } = useParams();
    // const { server } = useParams();

    console.log(serverId, "THIS IS SERVER ID FROM CHANNELS ----------------------")

    useEffect(() => {
        dispatch(getAllChannels(serverId))
        return () => {
        }
    }, [dispatch, serverId])

    const allChannels = useSelector(state => state.channels)
    const channels = Object.values(allChannels)

    const allServers = useSelector(state => state.servers)
    console.log(allServers, "THIS IS ALL SERVERS!!! ----------------------")

    const servers = Object.values(allServers);
    console.log(servers, "THIS IS SERVERS!!! ----------------------")
    const oneServer = servers.filter(server => server.id)
    console.log(oneServer, "THIS IS SERVER NAME!!! ----------------------")

    return (
        <>
            {/* <div className='server-name'>
                <p id='server-title'>{servers.name}</p>
            </div> */}
            <div className='channels-container'>
                {channels.map((channel, i) => (
                    <div className='channel-each' key={i}>
                        # {channel?.name}
                        <div className='edit-delete-channels'>
                            <NavLink to='/edit-channel'>
                                <i
                                    className="fas fa-edit edit__btn">
                                </i>
                            </NavLink>
                            <NavLink to='/delete-channel'>
                                <i
                                    className="fas fa-trash-alt delete__btn">
                                </i>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}



export default Channels

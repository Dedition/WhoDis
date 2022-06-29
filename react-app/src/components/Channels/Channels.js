// This Component Displays ALL of the channels belonging to a specific server, as this component only displays at the route 'servers/:serverId'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllChannels } from '../../store/channels'
import { getServer } from '../../store/servers'

const Channels = () => {
    const dispatch = useDispatch()
    const { serverId } = useParams();
    // const { server } = useParams();

    console.log(serverId, "THIS IS SERVER ID FROM CHANNELS ----------------------")

    useEffect(() => {
        dispatch(getAllChannels(serverId))
        dispatch(getServer(serverId))
        return () => {
        }
    }, [dispatch, serverId])

    const allChannels = useSelector(state => state.channels)
    const channels = Object.values(allChannels)

    const allServers = useSelector(state => state.servers)
    console.log(allServers, "THIS IS ALL SERVERS!!! ----------------------")

    const servers = Object.values(allServers);
    console.log(servers, "THIS IS SERVERS!!! ----------------------")
    const oneServer = servers.filter(server => server.id === serverId)
    console.log(oneServer, "THIS IS SERVER NAME!!! ----------------------")

    return (
        <>
            <div className='channel-name'>
                <p id='channel-title'>{servers.name}</p>
            </div>
            <div className='channels-container'>
                {channels.map((channel, i) => (
                    <div key={i}>{channel.name}</div>
                ))}
            </div>
        </>
    )
}



export default Channels

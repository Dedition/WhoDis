// This Component Displays ALL of the channels belonging to a specific server, as this component only displays at the route 'servers/:serverId'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllChannels } from '../../store/channels'

const Channels = () => {
    const dispatch = useDispatch()
    const {serverId} = useParams()

    console.log(serverId)
    useEffect(() => {
        dispatch(getAllChannels(serverId))
        return () => {
        }
    }, [dispatch,serverId])

    const allChannels = useSelector(state => state.channels)
    const channels = Object.values(allChannels)

    return (
        <div className='channels-container'>
            {   channels.map((channel, i) => (
                <div key={i}>{channel.name}</div>
             ))}
        </div>
    )
}



export default Channels
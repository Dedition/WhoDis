// This Component Displays ALL of the channels belonging to a specific server, as this component only displays at the route 'servers/:serverId'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllChannels } from '../../store/channels'
import './channels.css'
const Channels = ({showDms}) => {
    console.log(showDms)
    const dispatch = useDispatch()
    const { serverId } = useParams()
    useEffect(() => {
         dispatch(getAllChannels(serverId))
         return () => {
            
         }
    }, [dispatch, serverId])

    const allChannels = useSelector(state => state.channels)
    const channels = Object.values(allChannels)

    return (
        <div className='channels-container'>
            {channels.map((channel, i) => (
                <div className='channel-each' key={i}>{channel?.name}</div>
            ))}
        </div>
    )
}



export default Channels

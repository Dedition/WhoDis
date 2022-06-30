// This Component Displays ALL of the channels belonging to a specific server, as this component only displays at the route 'servers/:serverId'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllChannels, removeSingleChannel, editSingleChannel } from '../../store/channels'
import { getSingleServerId } from '../../store/check_home'
import DeleteChannel from '../DeleteChannel/DeleteChannel'
import './channels.css'
import { Route } from 'react-router-dom'

const Channels = () => {


    const dispatch = useDispatch()
    const history = useHistory();
    const { serverId } = useParams();


    const user = useSelector((state) => state.session.user)
    const allServers = useSelector((state) => state.servers)
    const servers = Object.values(allServers);

    const currentServer = servers.find(server => server.id == serverId)




    // REMOVE FORM FROM VIEW
    const [editForm, setEditForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false)
    const [channelId, setChannelId] = useState('');


    // EDIT FORM FUNCTION FOR ADDITIONAL FUNCTIONALITY
    const formEdit = (channelId) => {
        setEditForm(!editForm)
        setChannelId(channelId)
    }

    const formDelete = (channelId) => {
        setDeleteForm(!deleteForm)
        setChannelId(channelId)
        console.log(channelId)
    }


    // When component renders:
    useEffect(() => {
        if (serverId !== '@me') {
            dispatch(getAllChannels(serverId))
            dispatch(getSingleServerId(serverId))
        }
        return () => {
        }
    }, [dispatch, serverId])
    // Above useEffect may or may not need fixing 

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(removeSingleChannel(channelId))
        setDeleteForm(!deleteForm)
        history.push(`/servers/${serverId}`)
    }
    // DELETE FORM FUNCTIONALITY (ABOVE)


    // EDIT FORM FUNCTIONALITY (BELOW)
    const [name, setName] = useState("");

    const reset = () => {
        setName('');
    }

    // SUBMIT EDIT FORM 
    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            name
        };
        setEditForm(!editForm)
        const newChannel = dispatch(editSingleChannel(channelId, data));
        if (newChannel) {
            history.push(`/servers/${serverId}`);
            reset();
        }
    }



    const allChannels = useSelector(state => state.channels)
    const channels = Object.values(allChannels)



    return (
        <>
            {/* <div className='server-name'>
                <p id='server-title'>{servers.name}</p>
            </div> */}

            {/* WEIQI'S CHANGES */}
            {/* <div className='channels-container'>
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
                        </div> */}
            {/* <div className='channel-name'>
            </div> */}
            <div className='channels-container'>
                {channels.map((channel, i) => (
                    <div className='channel-each' key={i}>
                        {channel?.name}

                        {currentServer?.owner_id == user?.id &&
                            <div className='edit-delete-channels'>
                                <i onClick={() => formEdit(channel?.id)}
                                    className="fas fa-edit edit__btn">
                                </i>
                                <i onClick={() => formDelete(channel?.id)}
                                    className="fas fa-trash-alt delete__btn">
                                </i>
                            </div>}
                    </div>
                ))}
            </div>

            {/* DELETE CHANNEL FORM */}
            {deleteForm &&
                <div className='modal'>
                    <div className='form'>
                        <form onSubmit={handleDeleteClick}>
                            <div className='exit-server-form'>
                                <div className='exit__channel__delete' onClick={() => setDeleteForm(!deleteForm)}>x</div>
                            </div>
                            <div className="confirm-delete-text">
                                Are you sure you want to delete this channel?
                            </div>
                            <div className="delete-button-div">
                                <div className="confirm-delete-button">
                                    <button>CONFIRM DELETE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {/* DELETE CHANNEL FORM */}





            {editForm &&
                <div className='modal'>
                    <div className='form'>
                        <form onSubmit={submitForm}>
                            <div className='exit-server-form'>

                                <div className='exit__channel__edit' onClick={() => setEditForm(!editForm)}>x</div>
                            </div>
                            <div className='create-text'>Edit Channel!</div>
                            <label htmlFor='name'>Name</label>
                            <input
                                className='channel__input__name'
                                name="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <button type="submit">
                                Edit
                            </button>
                        </form>
                    </div>
                </div>}
        </>
    )
}



export default Channels

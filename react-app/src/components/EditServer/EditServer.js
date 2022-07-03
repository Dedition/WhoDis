import './editserver.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editSingleServer, removeSingleServer} from '../../store/servers';
import {useHistory} from 'react-router-dom';

const EditServer = ({serverInfo}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [toggleForm, setToggleForm] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false);

    const [name, setName] = useState('')
    const [banner_url, setBannerUrl] = useState('')
    const [server_icon_url, setServerIconUrl] = useState('')
    const [errors, setErrors] = useState('')


    useEffect(() => {
        const err = [];
        if (name.length <= 4) err.push('Server name must be at least 4 characters long.')
        setErrors(err)
    }, [name])



    const submitForm = (e) => {
        e.preventDefault();
        const payload = {
            name, 
            banner_url,
            server_icon_url
        }
        dispatch(editSingleServer(serverInfo?.id, payload))
    }

    const submitDelete = (e) => {
        e.preventDefault();
        dispatch(removeSingleServer(serverInfo?.id))
        history.push('/servers/@me')
    }



    return (
        <>
        <div className='edit-server-container'>
                <i className="fas fa-edit edit-btn" onClick={() => setToggleForm(!toggleForm)}></i>
                <i class="fas fa-trash delete-server-btn" onClick={() => setToggleDelete(!toggleDelete)}></i>


            { toggleDelete && 
            <div className='delete-server-container'> 
                <form className='delete-server-form' onSubmit={submitDelete}>
                    <p>Are you sure you want to delete this server?</p>
                    <button type='submit' className='delete-btn'>Delete</button>
                </form>
            </div>
            }
        </div>


            {toggleForm &&
                <form onSubmit={submitForm} className='edit-server-form'>
                    <h1>Edit Server</h1>
                    <ul>
                        {errors.length > 0 && errors.map((err) => (
                            <li>{err}</li>
                        ))}
                    </ul>
                    <div className='server-name-input'>
                        <label htmlFor='name'></label>
                        <input
                            placeholder={`${serverInfo?.name}`}
                            name='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>

                    <div className='server-banner-input'>
                        <label htmlFor='banner_url'></label>
                        <input
                            placeholder='Banner Url *Optional'
                            name='banner_url'
                            type='text'
                            value={banner_url}
                            onChange={(e) => setBannerUrl(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className='server-icon-input'>
                        <label htmlFor='server_icon_url'></label>
                        <input
                            placeholder='Server Icon Url *Optional'
                            name='server_icon_url'
                            type='text'
                            value={server_icon_url}
                            onChange={(e) => setServerIconUrl(e.target.value)}
                        >
                        </input>
                    </div>
                    <button type='submit' className='server-btn'>Submit</button>
                </form>
            }
        </>
    )
}

export default EditServer;
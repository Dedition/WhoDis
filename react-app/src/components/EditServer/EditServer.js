import './editserver.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editSingleServer, removeSingleServer} from '../../store/servers';
import {useHistory} from 'react-router-dom';
import {Modal} from '../../context/Modal'
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
        if (name.length <= 4) err.push('Server name must be at least 5 characters long.')
        setErrors(err)
    }, [name])



    const submitForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('banner_url', banner_url);
        formData.append('server_icon_url', server_icon_url);
        console.log(formData, serverInfo.id)
        dispatch(editSingleServer(serverInfo?.id, formData))
        setToggleForm(false)
    }

    const submitDelete = (e) => {
        e.preventDefault();

            dispatch(removeSingleServer(serverInfo?.id))
            history.push('/servers/@me')
            setToggleDelete(false)
    }



    return (
        <>
        
        <div className='edit-server-container'>
                <i className="fas fa-edit edit-btn" onClick={() => setToggleForm(true)}></i>
                <i className="fas fa-trash delete-server-btn" onClick={() => setToggleDelete(true)}></i>


            { toggleDelete && 
            <Modal>
            <div className='delete-server-container'> 
                <form className='delete-server-form' onSubmit={submitDelete}>
                    <p>Are you sure you want to delete this server?</p>
                    <button type='submit' className='delete-btn'>Delete</button>
                </form>
            </div>
            </Modal>
            }
        </div>


            {toggleForm &&
            <Modal onClose={() => setToggleForm(false)}>
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
                        <label htmlFor='banner_url'>Banner Image</label>
                        <input
                            placeholder='Banner Url *Optional'
                            draggable="false"
                            type="file"
                            accept="image/png, image/jpeg, image/png, image/gif"
                            name='banner_url'
                            onChange={(e) => setBannerUrl(e.target.files[0])}
                        >
                        </input>
                    </div>

                    <div className='server-icon-input'>
                        <label htmlFor='server_icon_url'>Server Icon</label>
                        <input
                            placeholder='Server Icon Url *Optional'
                            draggable="false"
                            type="file"
                            accept="image/png, image/jpeg, image/png, image/gif"
                            name='server_icon_url'
                            onChange={(e) => setServerIconUrl(e.target.files[0])}
                        >
                        </input>
                    </div>
                    <button type='submit' className='server-btn' disabled={!!errors.length}>Submit</button>
                </form>
                </Modal>
            }
        </>
    )
}

export default EditServer;
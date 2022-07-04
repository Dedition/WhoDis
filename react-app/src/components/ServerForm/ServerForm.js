import './serverform.css'
import { useEffect, useState } from 'react'
import { addSingleServer } from '../../store/servers'
import {useDispatch} from 'react-redux';
import {Modal} from '../../context/Modal';
const ServerForm = () => {

    const dispatch = useDispatch();


    const [name, setName] = useState('')
    const [banner_url, setBannerUrl] = useState('')
    const [server_icon_url, setServerIconUrl] = useState('')
    const [errors, setErrors] = useState('')
    const [toggleForm, setToggleForm] = useState(false);


    useEffect(() => {
        const err = [];
        if (name.length <= 4) err.push('Server name must be at least 5 characters long.')
        if (!banner_url.length) err.push('A server must have a banner')

        if (!server_icon_url.length) err.push('A server must have a server icon')
        setErrors(err)
    }, [name])


    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('banner_url', banner_url);
        formData.append('server_icon_url', server_icon_url);

        dispatch(addSingleServer(formData))
        setToggleForm(!toggleForm);
        setName('');
        setBannerUrl('')
        setServerIconUrl('')
}

    return (
        <>
        <div className='server-form-container'>
            <div className='server-bubble-form' onClick={() => setToggleForm(true)}>

                <i className="fas fa-plus-circle add-server-btn"></i>
            </div>
        </div>



            {toggleForm &&
                <Modal onClose={() => setToggleForm(false)}>
                <form onSubmit={submitForm} className='server-form'>
                    <h1>Create New Server</h1>
                    <ul>
                    {   errors.length > 0 && errors.map((err) => (
                        <li>{err}</li>
                    ))}
                    </ul>
                    <div className='server-name-input'>
                        <label htmlFor='name'></label>
                        <input
                            placeholder='Server Name'
                            name='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>

                    <div className='server-banner-input'>
                        <label htmlFor='banner_url'></label>
                        <input
                            draggable="false"
                            type="file"
                            accept="image/png, image/jpeg, image/png, image/gif"
                            name='banner_url'
                            onChange={(e) => setBannerUrl(e.target.files[0])}
                            required
                        >
                        </input>
                    </div>

                    <div className='server-icon-input'>
                        <label htmlFor='server_icon_url'></label>
                        <input
                            draggable="false"
                            type="file"
                            accept="image/png, image/jpeg, image/png, image/gif"
                            name='server_icon_url'
                            onChange={(e) => setServerIconUrl(e.target.files[0])}
                            required
                        >
                        </input>
                    </div>
                    <button type='submit' className='server-btn'>Submit</button>
                </form>
                </Modal>
}   
        </>
    )
}

export default ServerForm
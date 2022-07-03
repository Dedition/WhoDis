import './serverform.css'
import { useEffect, useState } from 'react'
import { addSingleServer } from '../../store/servers'
import {useDispatch} from 'react-redux';

const ServerForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [banner_url, setBannerUrl] = useState('')
    const [server_icon_url, setServerIconUrl] = useState('')
    const [errors, setErrors] = useState('')
    const [toggleForm, setToggleForm] = useState(false);


    useEffect(() => {
        const err = [];
        if (name.length <= 4) err.push('Server name must be at least 4 characters long.')

        setErrors(err)
    }, [name])


    const submitForm = (e) => {
        e.preventDefault()
        const payload = {
            name,
            banner_url,
            server_icon_url
        }

        dispatch(addSingleServer(payload))
}

    return (
        <>
        <div className='server-form-container'>
            <div className='server-bubble-form' onClick={() => setToggleForm(!toggleForm)}>

                <i className="fas fa-plus-circle add-server-btn"></i>
            </div>
        </div>



            {toggleForm &&
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

export default ServerForm
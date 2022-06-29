import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';

import { addSingleServer } from '../../store/servers'
import "./serverForm.css"

/********************************************************************************************************/

const ServerForm = () => {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [banner_url, setBannerUrl] = useState("");
    const [server_icon_url, setServerIconUrl] = useState("");
    const dm_channel = false;
    const [notPrivate, setNotPrivate] = useState(false);



    const history = useHistory();
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id)
    const owner_id = currentUserId;

    const reset = () => {
        setName('');
        setBannerUrl('');
        setServerIconUrl('');
        setNotPrivate(false);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const payload = {
            name,
            banner_url,
            server_icon_url,
            notPrivate,
            dm_channel,
            owner_id,
        };
        const newServer = dispatch(addSingleServer(payload));
        if (newServer) {
            history.push(`/servers`);
            reset();
        }
    }

    return (
        <div className='modal'>
            <div className='form'>
                <form onSubmit={submitForm}>
                    <div className='create-text'>Create New Server!</div>
                    <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                        <label htmlFor='banner_url'>Banner Img</label>
                    <input
                        name="banner_url"
                        type="text"
                        placeholder="Banner Img"
                        value={banner_url}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                        <label htmlFor="server_icon_url">Server Icon Img</label>
                    <input
                        name="server_icon_url"
                        type="text"
                        placeholder="Server Icon Img"
                        value={server_icon_url}
                        onChange={(e) => setServerIconUrl(e.target.value)}
                        required
                    />
                    </div>
                    <div className='public-private'>
                    <label htmlFor="public">
                        Public
                        <input
                            type="checkbox"
                            value="no"
                            name="public"
                            checked={notPrivate === 'no'}
                            onChange={(e) => setNotPrivate('no')}
                        />
                    </label>
                    <label htmlFor="public">
                        Private
                        <input
                            type="checkbox"
                            value="yes"
                            name="public"
                            checked={notPrivate === 'yes'}
                            onChange={(e) => setNotPrivate('yes')}
                        />
                    </label>
                    </div>
                    <div>
                    <button type="submit">
                        Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )

}


/********************************************************************************************************/

export default ServerForm;

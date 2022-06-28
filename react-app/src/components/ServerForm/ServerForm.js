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
    //const [dm_channel, setDMChannel] = useState(false);
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
        // const payload = {
        //     name,
        //     banner_url,
        //     server_icon_url,
        //     public: notPrivate,
        //     owner_id,
        // };
        const newServer = dispatch(addSingleServer());
        if (newServer) {
            history.push(`/servers`);
            reset();
        }
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div>Create New Server!</div>
                <label htmlFor='Name'>
                    <input 
                        name = "Name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor='Banner Url'>
                    <input
                        name = "Banner Url"
                        type="text"
                        placeholder="Banner Img"
                        value={banner_url}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="Server Icon Url">
                <input
                    name = "Server Icon Url"
                    type="text"
                    placeholder="Server Icon Img"
                    value={server_icon_url}
                    onChange={(e) => setServerIconUrl(e.target.value)}
                    required
                />
                </label>
                <label htmlFor="Public">
                    <input
                    type="checkbox"
                    value="no"
                    name="Public"
                    checked={notPrivate === 'no'}
                    onChange={(e) => setNotPrivate('no')}
                    />
                    Public
                </label>
                <label htmlFor="Public">
                    <input
                    type="checkbox"
                    value="yes"
                    name="Public"
                    checked={notPrivate === 'yes'}
                    onChange={(e) => setNotPrivate('yes')}
                    />
                    Private
                </label>
                <button  type="submit">
                    Submit
                </button>
            </form>
        </div>
    )

}


/********************************************************************************************************/

export default ServerForm;
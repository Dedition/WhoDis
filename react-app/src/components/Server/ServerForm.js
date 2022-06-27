import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';

import { addSingleServer, getAllServers } from '../../store/servers'
import "./serverForm.css"


const ServerForm = () => {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [banner_url, setBannerUrl] = useState("");
    const [server_icon_url, setServerIconUrl] = useState("");
    const [dm_channel, setDMChannel] = useState(false);
    const [notPrivate, setNotPrivate] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const submitForm = (e) => {
        e.preventDefault();
        // TODO: Come Back Later
    }

    return (
        pass
    )

}

export default ServerForm;
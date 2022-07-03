import './editusercard.css'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { editSingleUser, removeSingleUser, logout } from '../../store/session';

const EditUserCard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const userId = user?.id;
    const currentUserName = user?.username;
    const currentBio = user?.bio;
    
    const [name, setName] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [bio, setBio] = useState(user?.bio);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profile_pic_url, setProfilePicUrl] = useState(user?.profile_pic_url);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const err = []
        if (name.length <= 3) err.push('Username must be at least 4 characters')

        if (email.length <= 0 || !email.includes('@')) err.push('You must enter a valid email')

        if (password.length <= 7) err.push('Password must be at least 8 characters');

        if (password !== confirmPassword) err.push('Passwords must match');

        setErrors(err);
    }, [name, email, password, confirmPassword])



    const submitForm = (e) => {
        e.preventDefault();
        const username = name;
        const payload = {
            username,
            email,
            bio,
            profile_pic_url,
            password
            }
        dispatch(editSingleUser(userId, payload));
    }



    const deleteUser = () => {
        dispatch(removeSingleUser(userId));
        history.push('/')
    }

    return (
        <div className='edit-user-container'>
            <div className='edit-user-banner' style={{
                background: `url(https://images4.alphacoders.com/575/575154.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>banner</div>
            <div className='edit-user-info'>
                <div className='profile-pic-box'>
                    <div className='profile-pic' style={{
                        background: `url(${user?.profile_pic_url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}></div>
                </div>
                <div className='user-info'>
                    <div className='user-name'>{currentUserName}</div>
                    <div className='user-bio'>{currentBio}</div>
                </div>
            </div>
            <div className='edit-user-form'>

                <ul className='edit-user-errors'>
                {
                    errors.length > 0 && errors.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))
                }
                </ul>

                <form className='edit-form-user' onSubmit={submitForm}>
                    <label htmlFor='username'>Username</label>
                    <input
                    name='username'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                    <label htmlFor='email'>Email</label>
                    <input
                    name='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                    <label htmlFor='for'>Bio</label>
                    <input
                    type='text'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    >
                    </input>
                    <label htmlFor='profile_pic_url'>Profile Pic</label>
                    <input
                        name='profile_pic_url'
                        type='text'
                        value={profile_pic_url}
                        onChange={(e) => setProfilePicUrl(e.target.value)}
                    >
                    </input>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input
                        name='confirm_password'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </input>
                    {user?.username !== 'Demo' ?
                    <div className='edit-user-btn-box'>

                    <button id='edit-user-btn' type='submit' disabled={!!errors.length}>Submit Changes</button>
                    
                    <button id='delete-user' onClick={(e) => deleteUser()}>Delete Account</button>
                    </div> :
                    <p>You may not edit a demo user</p>
                     }
                </form>
            </div>
        </div>
    )
}

export default EditUserCard;
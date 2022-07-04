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
    const [profile_pic_url, setProfilePicUrl] = useState(user?.profile_pic_url);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const err = []
        if (name.length <= 3) err.push('Username must be at least 4 characters');

        if (email.length <= 0 || !email.includes('@')) err.push('You must enter a valid email');

        setErrors(err);
    }, [name, email])



    const submitForm = (e) => {
        e.preventDefault();
        const err = [];
        const formData = new FormData();
        formData.append('username', name);
        formData.append('email', email);
        formData.append('bio', bio);
        formData.append('profile_pic_url', profile_pic_url);
        dispatch(editSingleUser(userId, formData));
        setTimeout(() => {
            err.push('Username or email is already in use. Please try a different one.')
            setErrors(err)
        }, 700)


    }



    const deleteUser = () => {
        dispatch(removeSingleUser(userId));
        history.push('/')
    }

    return (
        <div className='edit-user-container'>
            <h2 className='warning-edit-message'>WARNING: Submitting changes to your user information will require you to validate your user info at the login page</h2>
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
                    placeholder='Banner Url *Optional'
                    draggable="false"
                    type="file"
                    accept="image/png, image/jpeg, image/png, image/gif"
                    name='banner_url'
                    onChange={(e) => setProfilePicUrl(e.target.files[0])}
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
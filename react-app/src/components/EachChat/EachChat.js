import './eachchat.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import EditChatForm from '../EditChatForm/EditChatForm';
import { Modal } from '../../context/Modal';
import DeleteChat from '../DeleteChat/DeleteChat';
import { NavLink } from 'react-router-dom';

const EachChat = ({msg, channelId}) => {

    const [toggleForm, setToggleForm] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);


    const allUsers = useSelector((state) => state.users);
    const loggedInUser = useSelector((state) => state.session.user);
    const users = Object.values(allUsers);
    const user = users.find(user => user?.id == msg?.user_id);



    const today = new Date()


    const daysBetween = (date_1, date_2) => {
        date_1 = new Date(date_1);
        date_2 = new Date(date_2);
        let difference = date_2.getTime() - date_1.getTime()
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays
    }

    const convertDate = (date) => {
        const toDate = new Date(date);
        const converted = toDate.toISOString().split('T')[0];
        return converted;
    }



    return (
        <div className='each-chat-container'>
            <div className='profile-pic-chat'>
                <div className='profile-pic-msg' style={{
                    background: `url(${user?.profile_pic_url})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>

                </div>
            </div>
            <div className='user-chat-container'>
                <div className='user-name-msg'>
                   {user?.username}
                </div>
                <div className='user-chat-msg'>
                    {msg?.content}
                </div>
            </div>
            { msg?.user_id == loggedInUser?.id &&
            <div className='msg-edit-box'>
                <i className="fas fa-edit edit-btn" onClick={() => setToggleForm(true)}></i>
                <i className="fas fa-trash delete-server-btn" onClick={() => setToggleDelete(true)}></i>
            </div>
            }
            {
                toggleForm &&
                <Modal onClose={() => setToggleForm(false)}>
                <EditChatForm toggleForm={setToggleForm}messageId={msg?.id}/>
                </Modal>
            }
            {
                toggleDelete && 
                <Modal onClose={() => setToggleDelete(false)}>
                    <DeleteChat messageId={msg?.id} toggleDelete={setToggleDelete}/>
                </Modal>
            }
        </div>
    )
}

export default EachChat
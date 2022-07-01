import { useDispatch, useSelector } from 'react-redux'

import './ChannelMessages.css'


const ChannelMessages = () => {
  const channelMessages = useSelector(state => state.channelMessages)
  const allChannelMessages = Object.values(channelMessages)

  const user = useSelector(state => state.session.user);
  const allUsers = useSelector(state => state);
  console.log(allUsers, "THIS IS ALL USERS----------------------")
  // const users = Object.values(allUsers);

  // const findUser = (userId) => {
  //   return users.find(user => user.id === userId)?.profile_pic_url
  // }


  return (
    <div className='messages-container'>
      {allChannelMessages.map(message => (
        <div className='each-row'>
          <div className='profile-pic-msg' style={{
            background: `url(${user?.profile_pic_url})`,
            backgroundSize: 'cover'
          }}></div>
          <div className='each-message-row'>
            <div className='each-message'>
              <p>{message.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChannelMessages;

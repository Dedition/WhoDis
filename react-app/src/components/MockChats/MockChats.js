// import {io} from 'socket.io-client'
// import {useEffect, useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {createChannelMessage} from '../../store/channel_messages';



// let socket

// const MockChats = () => {
//     const dispatch = useDispatch();
//     const [messages, setMessages] = useState([]);
//     const [chatInput, updateChatInput] = useState('');
//     const user = useSelector((state) => state.session.user)
    

//     useEffect(() => {
//         // create websocket
//         socket = io()
//         // listen for chat events
//         socket.on("chat", (chat) => {
//             // when we recieve a chat, add it into our messages array
//             const content = chat.msg
//             const payload = {
//                 content
//             }
//             dispatch(createChannelMessage(1, payload))
//             setMessages(messages => [...messages, chat])

//         })
//         return (() => {
//             socket.disconnect();
//         })
//     }, [])

//     const sendChat = (e) => {
//         e.preventDefault()
//         // emit a message
//         socket.emit("chat", {user: user?.username, msg: chatInput})
//         // clear the input field after 
//         updateChatInput("")
//     }

//     return (
//         <div>
//             <div>
//                 {messages.map((message, ind) => (
//                     <div key={ind}>{`${message.user}: ${message.msg}`}</div>
//                 ))}
//             </div>
//         <form onSubmit={sendChat}>
//             <input
//                 value={chatInput}
//                 onChange={(e) => updateChatInput(e.target.value)}
//             />
//             <button type="submit">Send</button>
//         </form>
//         </div>
//     )
// }

// export default MockChats;
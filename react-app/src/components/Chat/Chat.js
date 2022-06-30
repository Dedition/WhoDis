import ChatHeader from "./ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import "./Chat.css";

function Chat() {


    return (
        <div className="chat">
            <h2>I am the chat screen</h2>
            <ChatHeader />

            <div className="chat__messages">
                <ChatMessages />
                <ChatMessages />
                <ChatMessages />
            </div>
            <div className="chat__input">

                <i class="fa-solid fa-circle-plus chat__addIcon"></i>
                <form>
                    <input type="text" placeholder="Type a message" />
                    <button className="chat__inputButton" type="submit">Send</button>
                </form>

                <div className="chat__inputIcons">
                    <i class="fa-solid fa-gift chat__inputIcon"></i>
                    <i class="fa-solid fa-paperclip chat__inputIcon"></i>
                    <i class="fa-solid fa-smile chat__inputIcon"></i>
                </div>
            </div>
        </div>
    );
}

export default Chat;

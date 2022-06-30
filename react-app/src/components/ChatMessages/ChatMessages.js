import "./ChatMessages.css";

function ChatMessages() {
    return (
        <div className="chatMessages">
            <i class="fa-solid fa-user-circle chatMessages__avatarIcon"></i>
            <div className="chatMessages__info">
                <h4>Tested
                    <span className="chatMessages__timestamp">This is a timestamp</span>
                </h4>
                <p>This is a component message</p>
            </div>
        </div>
    )
}

export default ChatMessages;

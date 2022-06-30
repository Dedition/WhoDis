import "./ChatHeader.css";

function ChatHeader() {
    return (
        <div className="chatHeader">
            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">#</span>
                    Test Channel Name
                </h3>
            </div>

            <div className="chatHeader__right">
                <i class="fa-solid fa-bell chatHeader__rightIcon"></i>
                <i class="fa-solid fa-map-marker-alt chatHeader__rightIcon"></i>
                <i class="fa-solid fa-user-alt chatHeader__rightIcon"></i>
                <div className="chatHeader__search">
                    <i class="fa-solid fa-search chatHeader__rightIcon"></i>
                    <input type="text" placeholder="Search" />
                </div>
                <i class="fa-solid fa-paper-plane chatHeader__sendIcon"></i>
                <i class="fa-solid fa-question-circle chatHeader__helpIcon"></i>
            </div>
        </div>
    )
}

export default ChatHeader;

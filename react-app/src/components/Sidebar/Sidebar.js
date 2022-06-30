import SidebarChannels from "../SidebarChannels/SidebarChannels"
import UserProfile from "../UserSettings/UserSettings";

import "./Sidebar.css";

function Sidebar() {

    return (
        <div className="sidebar">
            <h1>I am the Sidebar</h1>
            <div className="sidebar__top">
                <h3>Sidebar Right Top</h3>
                <i class="fa-solid fa-angle-down expand-more"></i>
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <i class="fa-solid fa-angle-down expand-more"></i>
                        <h3>Channels</h3>
                    </div>

                    <i class="fa-solid fa-plus sidebar__addChannel"></i>
                </div>
                <div className="sidebar__channelsList">
                    <SidebarChannels />
                    <SidebarChannels />
                    <SidebarChannels />
                    <SidebarChannels />
                </div>
            </div>
            <div className="sidebar__voice">
                <i class="fa-solid fa-signal
                    sidebar__voiceIcon"
                    fontSize="large"></i>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Disconnected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <i class="fa-solid fa-microphone sidebar__voiceIcon"></i>
                    <i class="fa-solid fa-circle-info sidebar__voiceIcon"></i>
                </div>
            </div>

            <div className="sidebar__profile">
                <i class="fa-solid fa-user-astronaut"></i>
                <div className="sidebar__profileInfo">
                    <h3>ProfileName</h3>
                    <p>ProfileId</p>
                    <p>ProfileBio</p>
                </div>
                <div className="sidebar__profileIcons">
                    <i class="fa-solid fa-microphone sidebar__profileIcon"></i>
                    <i class="fa-solid fa-headset sidebar__profileIcon"></i>
                    <i class="fa-solid fa-cog sidebar__profileIcon"></i>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

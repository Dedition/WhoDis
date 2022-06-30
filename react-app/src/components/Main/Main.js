import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./main.css";


const Main = () => {
    return (
        <div className='main'>
            <Sidebar />
            <Chat />
        </div>
    )
}


export default Main

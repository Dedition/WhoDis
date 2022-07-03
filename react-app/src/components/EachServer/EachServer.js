import './eachserver.css'
import { NavLink } from 'react-router-dom'
const EachServer = ({server}) => {
    return (
        <div className='server-container'>
            <div className='server-bubble'>
                <NavLink to={`/servers/${server.id}`}>HELLO</NavLink>
            </div>
        </div>
    )
}

export default EachServer;
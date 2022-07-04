import './eachserver.css'
import { NavLink } from 'react-router-dom'
const EachServer = ({server}) => {
    const icon = server.server_icon_url;

    const imageUrl = 'https://images.wallpapersden.com/image/download/cool-anonymous-neon-boy_bGhnamqUmZqaraWkpJRnbmhnrWduaGdnZWZubGs.jpg'

    return (
        <div className='server-container'>
            <div className='server-bubble' style={{
                backgroundImage: icon ? `url(${icon})` : 'url(https://wallpapers.com/images/high/cool-neon-hoodie-profile-picture-vt4w54fxrvenydvu.jpg)',
                backgroundSize: 'cover',
            }}>
                <NavLink id='server-link' to={`/servers/${server.id}`}>{server.name[0]}</NavLink>
            </div>
        
        </div>
    )
}

export default EachServer;
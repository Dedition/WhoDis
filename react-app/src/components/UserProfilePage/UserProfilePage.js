import EditUserCard from '../EditUserCard/EditUserCard';
import ProfileSideBar from '../ProfileSideBar/ProfileSideBar';
import './userprofilepage.css'


const UserProfilePage = () => {
    return (
        <div className='user-page-container'>
            <ProfileSideBar/>
            <EditUserCard/>
        </div>
    )
}

export default UserProfilePage;
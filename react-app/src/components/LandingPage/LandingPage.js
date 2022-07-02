import './landingpage.css'
import NavBar from '../NavBar'
import LandingText from '../LandingText/LandingText'

const LandingPage = () => {
    return (
        <div className='landing-container'>
            <NavBar/>
            <img className='landing-background' src='https://images.unsplash.com/photo-1519575706483-221027bfbb31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'></img>
            <LandingText/>
        </div>
    )
}


export default LandingPage
import { useLocation } from "react-router-dom";
import { useContext } from 'react'
import ThemeContext from "../../contex/themeContext";
import UserContext from "../../contex/userContext";
import Logo from '../../images/ChatItUp_transparent.png'

const Header = () => {
    const { actions , authUser } = useContext(UserContext);
    const { accentColor, darkMode} = useContext(ThemeContext);
    const location = useLocation();

    return (
        <header style={{backgroundColor: `${accentColor}`}} className={`${location.pathname.includes('/Chat/Session') ? 'd-none':'d-flex '} align-items-center justify-content-between py-2 py-md-4 px-2 mb-2`}>
            <span className={` ${ darkMode ? 'text-white':null} d-flex align-items-center`}>
                {authUser ?
                <>
                    <img className="userPortrait border border-2 rounded-circle me-2" src={authUser.Portrait} alt="" />
                    <h1 className="mb-0 text-white fw-bold">{authUser.Username.substring(0, 5)}<b style={{color: "#111"}}>{authUser.Username.substring(5, 8)}</b><b style={{color: "#f8b231"}}>{authUser.Username.substring(8, 15)}</b></h1>
                </>
                :
                <>
                    <img className="logo  me-1" src={Logo} alt=""/>
                    <h1 style={{backgroundColor: "#b0b1b2"}}  className="mb-0 text-white p-1 border-0 rounded">Chat<b className="text-black">It</b><i className="fw-bolder" style={{color: '#f8b231'}}>Up</i></h1>
                </>
                }
            </span>
            <nav>
                {
                location.pathname.includes('/Chat') ?
                <ul>
                    <li  onClick={ e => actions.signOut()}><button className="btn btn-dark border border-2 headerBtn">Sign Out</button></li>
                </ul>
                :
                <ul>
                    {
                        location.pathname === '/SignIn' ?
                        <li onClick={ e => {actions.setErrors([""]); actions.navigate('/SignUp')}}><button className="btn btn-dark border border-2 headerBtn">Sign Up</button></li>
                        :
                        <li  onClick={ e => {actions.setErrors([""]); actions.navigate('/SignIn')}}><button className="btn btn-dark border border-2 headerBtn">Sign In</button></li>
                    }
                </ul>
                }
            </nav>
        </header>
    )
}

export default Header;
import { useContext } from "react";
import UserContext from "../../../contex/userContext";
import ThemeContext from "../../../contex/themeContext";

const Private_Setting = () => {
    const { authUser , actions } = useContext(UserContext);
    const {  darkMode } = useContext(ThemeContext);

    return(
        <div className={`${darkMode ? 'text-white':null} w-100 mt-4`}>
            { authUser.isPrivate ? 
                <span className={`${ darkMode ? 'bg-dark':null} d-flex align-items-center p-3 border rounded mb-3`} onClick={ e => actions.updateProfile('Private', {Status: false})}>
                    <div>
                        <i className="fa-solid fa-eye-slash border p-1 me-2 mb-2 fs-2 align-self-start"></i>
                        <h5>Enabled</h5>
                    </div>
                    <p className="m-0 ms-2 ps-2 text-start border-start border-2">While account is <b>private</b> all add & chat <b>request</b> will need to be <b>accepted</b> before chatting</p>
                </span>
            :
                
                <span className={`${ darkMode ? 'bg-dark':null} d-flex align-items-center p-3 border rounded mb-3`} onClick={ e => actions.updateProfile('Private', {Status: true})}>
                    <i className="fa-regular fa-eye-slash border p-1 me-2 fs-2"></i>
                    <h3 className="fs-5 m-0">Enable Private</h3>
                </span>
            }
        </div>
    )
}

export default Private_Setting;
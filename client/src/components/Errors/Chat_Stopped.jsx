import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../contex/themeContext";


const Chat_Stopped = () => {
    const { darkMode } = useContext(ThemeContext)
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/Chat');
    }, 3000);
    return (
        <div className='d-flex flex-column vh-100 align-items-center'>
            <div className={`mt-4 border ${darkMode ? 'bg-white border-white':null} p-2 rounded border-3`}>
                <h3 className={`mx-auto ${darkMode ? 'bg-white':null} my-auto`}>Chat Session Was Stopped</h3>
            </div>
            <p className={`d-flex align-items-center ${darkMode ? 'text-light':null}  mt-3 fs-5`}> Returning to Home <i class={`fa-solid fa-spinner ms-2 fs-2 ${darkMode ? 'text-white':'text-secondary'} fa-spin`}></i></p>  
            <i class={`fa-solid fa-comment-slash ${darkMode ? 'text-white':null} mt-4`} style={{ fontSize: "7em"}}></i>
        </div>
    )
}

export default Chat_Stopped;
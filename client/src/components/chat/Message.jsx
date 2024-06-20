import React, { useState } from "react";
import ThemeContext from "../../contex/themeContext";

const Message = ({ Message , Time , userOneColor, userTwoColor , messageID, messageUserID, yourUserID , deleteMessage }) => {
    const { darkMode , accentColor } = useState(ThemeContext);
    const [ edit , setEdit ] = useState(false)

    return (
        <>
            <div className={`message-border border-2 p-1 ps-2  rounded mt-3 ${messageUserID === yourUserID ? '':'me-auto'}`} style={{borderColor: messageUserID === yourUserID ? `${userOneColor}`:`${userTwoColor}`}}>
                <p className={`fs-5 mb-0 text-start ${darkMode ? 'text-white':null}`}>{Message}</p>
                <span className="d-flex align-items-center">
                    <i className={`${edit ? 'fa-solid':'fa-regular'} ${darkMode ? 'text-white':null} ${messageUserID === yourUserID ? '':'d-none'} fa-square-caret-down py-2 fs-5  me-2`} style={{color: "#f8b231"}} onClick={ e => setEdit(pre => !pre)}></i>
                    <p className={`mb-0 messageTime ${darkMode ? 'text-white':null}`} style={messageUserID !== yourUserID ? {color: "#b480fb"}:null}>{Time}</p>
                </span>
            </div>
            <span className={`${!edit ? 'd-none': 'd-flex'} mt-2 ${messageUserID === yourUserID ? '':'me-auto'}`}>
                <i className="fa-regular fa-trash-can fs-5 btn btn-dark" onClick={e => deleteMessage(Time)}></i>
            </span>
        </>
    );
}

export default Message;
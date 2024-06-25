import React, { useContext, useEffect, useState } from "react";
import Session from "./Session";
import SessionContext from "../../../contex/sessionContext";
import UserContext from "../../../contex/userContext";
import ThemeContext from "../../../contex/themeContext";

const Sessions = () => {
    const { sessions , actions } = useContext(SessionContext)
    const { authUser } = useContext(UserContext);
    const { darkMode } = useContext(ThemeContext);
    const [ requestCount , setRequestCount ] = useState([]);
    const [ reload , setReload ] = useState(false);

    useEffect(()=>{
        (async()=>{
            await actions.getSessions()
            setRequestCount(pre => authUser.ChatRequests ? pre = authUser.ChatRequests.length: null)
        })()        
    }, [reload, requestCount])

    return (
        <div  className="w-100 px-4 pt-3">
            <nav className="d-flex align-items-center justify-content-end border-top border-2 py-2 w-100">
                <ul className="d-flex align-items-center justify-content-between mt-1 mb-2 w-100">
                    <li onClick={ e => actions.navigate("Chat/Settings/Privacy/ChatRequest")} className={`${darkMode ? 'text-white':null} d-flex btn border-0 p-0  align-items-center`} ><i className={`${darkMode ? 'bg-dark':null} d-flex fa-solid fa-user-plus  p-2 me-2 rounded`} style={{background: "#f8b231", color: "white"}}><p className="m-0 ms-1">{requestCount ? requestCount:""}</p></i> Chat Requests</li>
                    <li className="p-0"><i className={`${darkMode ? 'text-white bg-dark':null} fa-solid fa-rotate  refreshBtn border border-2 p-2 rounded`} style={{color: "#b480fb"}} onClick={ e => setReload(pre => !pre)}></i></li>
                </ul>
            </nav>
            {sessions.map( session => (
                <Session key={session.Session_ID} Session={session} reload={reload}/>
            ))}
        </div>
    )
}

export default Sessions;
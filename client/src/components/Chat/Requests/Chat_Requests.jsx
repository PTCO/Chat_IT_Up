import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contex/userContext";
import Request from "./Request";
import ThemeContext from "../../../contex/themeContext";

const Chat_Requests = () => {
    const { authUser , actions } = useContext(UserContext);
    const {  darkMode } = useContext(ThemeContext);
    const [ reload , setReload ] = useState(false);

    const refresh = () => {
        setTimeout(() => {
            setReload(pre => !pre)
        }, 1000);
        
    }

    useEffect(()=>{
        (async()=>{
            await actions.refreshRequests()
        })()
    }, [reload])
    
    return (
        <div className="w-100 min-vh-100">
            <nav className="d-flex align-items-center justify-content-end w-100 mt-1">
                <ul>
                    <li className="btn p-0"><i className={`${darkMode ? 'text-white bg-dark':null} refreshBtn fa-solid fa-rotate border border-2 p-2 rounded`} onClick={ e => setReload(pre => !pre)}></i></li>
                </ul>
            </nav>
            <div className={`${darkMode ? 'text-white':null} d-flex flex-column chatRequestContainer`}>
                <h2 className="w-100 m-0 border-bottom border-2 text-start pb-2 fs-3">Sent Requests</h2>
                <div className="d-flex flex-column  h-100">
                    {authUser.ChatRequests ? authUser.ChatRequests.map( request => {
                        if(request.Requester_id === authUser.User_ID) {
                            return (
                                <Request key={request.Request_ID} refresh={refresh} Username={request.Username} Portrait={request.Portrait} Requester_ID={request.Requester_id} Request_ID={request.Request_ID} Type={"Sent"}  />
                            )
                        }
                    } 
                    ):null}
                </div>
            </div>
            <div className={`${darkMode ? 'text-white':null} d-flex flex-column chatRequestContainer`}>
                <h2 className="w-100 m-0 border-bottom border-2 text-start pb-2 fs-3">Recieved Requests</h2>
                <div className="d-flex flex-column h-100">
                    {authUser.ChatRequests ? authUser.ChatRequests.map( request => {
                        if(request.Requester_id !== authUser.User_ID) {
                            return (
                                <Request key={request.Request_ID} refresh={refresh} Username={request.Username} Portrait={request.Portrait} Requester_ID={request.Requester_id} Request_ID={request.Request_ID}  Type={"Received"}/>
                            )
                        }
                    } 
                    ):null}
                </div>
            </div>
        </div>
    )
}

export default Chat_Requests;
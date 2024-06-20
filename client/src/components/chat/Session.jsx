import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../../contex/sessionContext";
import UserContext from "../../contex/userContext";
import axios from "axios";

const Session = ({reload, Session }) => {
    const { actions } = useContext(SessionContext)
    const [ subNav , setSubNav] = useState(false);
    const [ consent, SetConsent] = useState(false);

    const [ notifications , setNotifications] = useState([]);

    const clearNotifications = async () => {
        await axios.delete(`${process.env.REACT_SERVER_URL}/Sessions/Notifications/` + Session.Session_ID)
    } 

    useEffect(()=>{
        (async()=>{
            await axios.get(`${process.env.REACT_SERVER_URL}/Sessions/Notifications/` + Session.Session_ID)
            .then( result => setNotifications(result.data))
        })()
    }, [reload])

    return (
        <>
            <div className='d-flex p-2 rounded mb-1 align-items-center colorFullBorders justify-content-between border border-2' onClick={ e => {clearNotifications(); actions.setSession(Session); actions.getMessages()}} >
                <Link className="d-flex align-items-center bg-white w-100"  to={'/Chat/Session'}>
                    <img src={ Session.Portrait } alt="" className="userPortrait rounded-circle me-2"/>
                    <h1 className="fs-3 mb-0">{ Session.Username }</h1>
                </Link>
                <p className={`${notifications.length === 0 ? 'd-none':null} m-0 ms-auto me-3 bg-dark text-white  p-2 px-3 rounded-circle`}>{notifications.length ? notifications.length:0}</p>
                <i className="fa-solid fa-ellipsis-vertical fa-2x border p-2 rounded" onClick={ e => setSubNav(pre => !pre)}></i>
            </div>
            <nav className={`${subNav ? 'd-flex':'d-none'} mt-2`}>
                <ul>
                    <li onClick={ e => SetConsent(pre => !pre)} className="d-flex align-items-center border p-1 rounded bg-dark text-white "><i className="fa-solid fa-user-slash fa-lg me-1"></i>Stop</li>
                </ul>
            </nav>
            <div className={`${consent ? 'd-flex':'d-none'} align-items-center border-top border-2 mt-2 pt-2`}>
                <p className="m-0">Are you sure you would like to stop talking to {Session.Username}?</p>
                <span className="d-flex align-items-center ms-2"><button className="btn btn-dark me-2" onClick={ e => actions.deleteSession(Session.Session_ID)}>Yes</button><button onClick={ e => SetConsent(false)} className="btn bg-dark border-dark text-white">No</button></span>
            </div>
        </>
    );
}

export default Session;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import User_Info from './User_Info';
import Messages from './Messaging/Messages';
import Message_Input from './Message_Input';
import SessionContext from '../../../contex/sessionContext';
import UserContext from '../../../contex/userContext';
import { useParams } from 'react-router-dom';

const ChatView = () => {
    const { actions , messages, session } = useContext(SessionContext)
    const { authUser } = useContext(UserContext);

    const { sessionid } = useParams();

    const [ reload , setReload ] = useState(false);

    const deleteMessage = async (Time) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}DeleteMessage/${authUser.User_ID}/${Time}`)
        .then( () => setReload(pre => !pre))
    }

    const sendMessage = async (e, message) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_SERVER_URL}Sessions/NewMessage`, {Message: message, Session_ID: session.Session_ID, Username: session.Username, UserID: authUser.User_ID, yourUsername: authUser.Username})
        .then( () => setReload(pre => !pre))
    }

    useEffect(()=>{
        (async()=>{
            await actions.getMessages(sessionid)
        })()
    }, [reload, session, messages])
    setTimeout(() => {
        if(!session && !messages) actions.navigate('/Chat/Stopped')
    }, 500);
    return (  
        <>
            <User_Info  Username={session ? session.Username:null} Portrait={session ? session.Portrait:null}/>
            <Messages Messages={messages ? messages:[]} deleteMessage={deleteMessage} UserID={session ?session.UserUserID:null}/>
            <Message_Input sendMessage={sendMessage}/>
        </>
    ); 


}

export default ChatView;
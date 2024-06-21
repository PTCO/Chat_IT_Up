import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from "./userContext";

const SessionContext = createContext();

export const SessionProvider = (props) => {
    const { authUser ,actions } = useContext(UserContext);

    const [ sessions , setSessions ] = useState([]);
    const [ session , setSession ] = useState({});
    const [ messages , setMessages ] = useState([]);
    const [ results, setResults ] = useState([]);
    const [ resultMsg, setResultMsg ] = useState("");

    const navigate = useNavigate();
    
    const handleErrors = (errors) => {
        if(errors.response.status === 400 || errors.response.status === 400){
            navigate('/forbidden')
        } else {
            navigate('/error')
        }
    }

    const getSessions = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}Sessions/` + authUser.User_ID)
        .then( result => { setSessions(result.data)})
        .catch( errors => {
            handleErrors(errors);
        })
    }

    const createSession = async(Username, UserTwoID, UserTwoPortrait, Request) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}Sessions/Create`, 
        {
            UserTwoUsername: Username, 
            UserOneUsername: authUser.Username,
            UserID: authUser.User_ID,
            UserTwoID: UserTwoID,
            UserOnePortrait: authUser.Portrait,
            UserTwoPortrait: UserTwoPortrait,
            Request
        })
        .then( result => { 
            if(result.data === 'Requested') navigate('/Chat/Settings/Privacy/ChatRequest') 
            else navigate('/Chat') 
        })
        .catch( errors => {
            handleErrors(errors);
        })
    }

    const deleteSession = async(Session_ID)=> {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}Sessions/Delete/${Session_ID}/${authUser.User_ID}`)
        .then(result => setSessions(result.data))
        .catch( errors => {
            handleErrors(errors);
        })
    }

    const searchSession = async(e, search) => {
        e.preventDefault()
        if(!search) { setResults([]); setResultMsg("Please Enter A Username"); return}
        await axios.get(`${process.env.REACT_APP_SERVER_URL}Sessions/Search/${search}/CurrentUser/${authUser.Username}/${authUser.User_ID}`)
        .then( result => {setResults(result.data.Users); setResultMsg(result.data.Message)})
        .catch( errors => {
            handleErrors(errors);
        })
    }

    const getMessages = async () => {
        if(session && session.Session_ID !== undefined){
            await axios.get(`${process.env.REACT_APP_SERVER_URL}Sessions/Messages/` + session.Session_ID)
            .then( result => {setSession(result.data.session); setMessages(result.data.messages);})
            .catch( error => handleErrors(error))
        }
    }


    return (
        <SessionContext.Provider value={{
            sessions,
            results,
            resultMsg,
            session,
            messages,
            actions: {
                getSessions,
                createSession,
                searchSession,
                setSession,
                setResults,
                setResultMsg,
                getMessages,
                deleteSession,
                navigate,
                getUser: actions.getUser
            }

        }}>
            {props.children}
        </SessionContext.Provider>
    )
}

export default SessionContext;
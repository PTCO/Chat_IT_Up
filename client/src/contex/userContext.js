import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const UserContext = createContext();

export const UserProvider = (props) => {
    axios.defaults.withCredentials = true;

    const [ authUser , setAuthUser] = useState(null);
    const [ errors , setErrors ] = useState([]);
    
    const navigate = useNavigate();
    const handleErrors = (errors) => {
        if(errors.response.status === 400 || errors.response.status === 400){
            setErrors(errors.response.data)
        } else {
            navigate('/error')
        }
    }
    
    useEffect(()=>{
        if(!Cookie.get('userSession')) return 
        const session = JSON.stringify(Cookie.get('userSession')).substring(3).split('.');
        (async () => await axios.post(`${process.env.REACT_APP_SERVER_URL}User/Check`, {session}, {withCredentials: true})
        .then( result => {
            setAuthUser(result.data);
        })
        .catch(errors => {
            handleErrors(errors);
        })
        .finally( () => {
            navigate('/Chat')
        })
        )();
    }, [])
    

    const signIn = async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}User/SignIn`, {formData: data})
        .then( result => {
            setAuthUser(result.data); 
            Cookie.set("userSession", Cookie.get('connect.sid'), {secure: true, sameSite: 'None', expires: 7 * 24 * 60 * 60 * 1000})
            navigate('/Chat');
        })
        .catch( errors => {
            handleErrors(errors);
        })
    }

    const signUp = async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}User/Signup`, {formData: data})
        .then( result => {setAuthUser(result.data); navigate('/Chat')})
        .catch(errors => {
            handleErrors(errors);
        })
    }
    const updateProfile = async (request, data) => {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}User/Update`, {request, User_ID: authUser.User_ID, formData: data})
        .then( result => {setAuthUser(result.data.User); setErrors(result.data.resultMsg)})
        .catch(errors => {
            handleErrors(errors);
        })
    }

    const getUser = async() => {
        if(!authUser) return
        await axios.get(`${process.env.REACT_APP_SERVER_URL}User/Get/` + authUser.User_ID, {withCredentials: true})
        .then( result => setAuthUser(result.data))
        .catch(errors => {
            handleErrors(errors);
        })
    }

    const signOut = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}User/LogOut/` + authUser.User_ID)
        .then( () => {
            setAuthUser(null);
            Cookie.remove('connect.sid')
            navigate('/SignIn')
        })
        .catch(errors => {
            handleErrors(errors);
        })
    }

    return (
        <UserContext.Provider value={{
            authUser,
            errors,
            actions: {
                signIn,
                signUp,
                navigate,
                signOut,
                updateProfile,
                setErrors,
                setAuthUser,
                getUser
            }

        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
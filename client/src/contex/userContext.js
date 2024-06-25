import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const UserContext = createContext();

export const UserProvider = (props) => {
    axios.defaults.withCredentials = true;

    const location = useLocation();

    const [ authUser , setAuthUser] = useState(null);
    const [ errors , setErrors ] = useState([]);
    
    const navigate = useNavigate();
    
    const handleErrors = (errors) => {
        if(errors.response.status === 400 || errors.response.status === 400){
            setErrors(errors.response.data)
        } 
        else if(errors.response.status === 205) {
            navigate('/SignIn')
        }
        else {
            navigate('/error')
        }
    }
    
    useEffect(()=>{
        if(!Cookie.get('usc')) return
        navigate('/Loading') 
        const session = JSON.stringify(Cookie.get('usc')).substring(3, 35);
        (async () => await axios.post(`${process.env.REACT_APP_SERVER_URL}User/Check`, {session}, {withCredentials: true})
        .then( result => {
            setAuthUser(result.data);
        })
        .catch(errors => {
            handleErrors(errors);
        })
        .finally(()=>{
            setTimeout(() => {
                navigate(location.pathname);
            }, 2000);
        })
        )();
    }, [])
    

    const signIn = async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}User/SignIn`, {formData: data})
        .then( result => {
            setAuthUser(result.data.user);
            Cookie.set('usc', JSON.stringify(result.data.sess.sid), {secure: true, sameSite: 'Strict', expires: 7 * 24 * 60 * 60 * 1000})
            navigate('/Chat');
        })
        .catch( errors => {
            console.log(errors)
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
        await axios.put(`${process.env.REACT_APP_SERVER_URL}User/Update`, {request, User_ID: authUser.User_ID, formData: data}, {withCredentials: true})
        .then( result => {setAuthUser(result.data.User); setErrors(result.data.resultMsg)})
        .catch(errors => {
            handleErrors(errors);
        })
    }

    const refreshRequests = async() => {
        if(!authUser) return
        await axios.get(`${process.env.REACT_APP_SERVER_URL}User/Get/` + authUser.User_ID, {withCredentials: true})
        .then( result => {
            setAuthUser(result.data)
        })
        .catch(errors => {
            handleErrors(errors);
        })
    }

    const signOut = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}User/LogOut/` + JSON.stringify(Cookie.get('usc')).substring(3, 35))
        .then( () => {
            setAuthUser(null);
            Cookie.remove('usc')
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
                refreshRequests
            }

        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
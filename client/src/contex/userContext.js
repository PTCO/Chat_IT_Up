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
        if(errors.response.status === 400){
            setErrors(errors.response.data)
        } 
        else if(errors.response.status === 205) {
            navigate('/SignIn')
        }
        else if(errors.response.status === 401) {
            Cookie.remove('usc')
            navigate('/Unauthorized')
        }
        else {
            navigate('/error')
        }
    }

    const userCheck = async () => {
        const session = JSON.stringify(Cookie.get('usc')).substring(3, 35);
        await axios.post(`${process.env.REACT_APP_SERVER_URL}User/Check`, {session})
        .then( result => {
            setAuthUser(result.data);
            navigate(location.pathname !== "/Chat" ? location.pathname:"/Chat")
        })
        .catch(errors => {
            handleErrors(errors);
        })
    }
    
    useEffect(()=>{
        if(!Cookie.get('usc')) return
        navigate('/Loading') 
        userCheck()
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
        .then( result => {
            setAuthUser(result.data.user);
            Cookie.set('usc', JSON.stringify(result.data.sess.sid), {secure: true, sameSite: 'Strict', expires: 7 * 24 * 60 * 60 * 1000})
            navigate('/Chat');
        })
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

    const deleteUser = async (consentMsg) => {
        if(consentMsg !== "Yes, I would like to delete my ChatITUp Account") return setErrors(['Consent message does not match'])
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}User/Delete/${authUser.User_ID}/${JSON.stringify(Cookie.get('usc')).substring(3, 35)}`)
        .then(()=> {
            navigate('/Deletion', {state: "Deleting"})
            Cookie.remove("usc")
            setAuthUser(null);
            setTimeout(() => {
                navigate('/SignIn')
            }, 3000);
        })
    }

    const refreshRequests = async() => {
        if(!authUser) return
        await axios.get(`${process.env.REACT_APP_SERVER_URL}User/Get/` + authUser.User_ID)
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
                handleErrors,
                deleteUser,
                updateProfile,
                setErrors,
                userCheck,
                setAuthUser,
                refreshRequests
            }

        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const UserContext = createContext();

export const UserProvider = (props) => {
    const cookie = Cookie.get('authUser');
    const [ authUser , setAuthUser] = useState(cookie ? JSON.parse(cookie):null);
    
    const [ errors , setErrors ] = useState([]);

    const navigate = useNavigate()

    const handleErrors = (errors) => {
        if(errors.response.status === 400 || errors.response.status === 400){
            setErrors(errors.response.data)
        } else {
            navigate('/error')
        }
    }

    const signIn = async (data) => {
        await axios.post('http://localhost:4000/User/SignIn', {formData: data})
        .then( result => {
            setAuthUser(result.data); 
            Cookie.set('authUser', JSON.stringify(result.data))
            navigate('/Chat');
        })
        .catch( errors => {
            handleErrors(errors);
        })
    }

    const signUp = async (data) => {
        await axios.post('http://localhost:4000/User/Signup', {formData: data})
        .then( result => {setAuthUser(result.data); navigate('/Chat')})
        .catch(errors => {
            handleErrors(errors);
        })
    }
    const updateProfile = async (request, data) => {
        await axios.put('http://localhost:4000/User/Update', {request, User_ID: authUser.User_ID, formData: data})
        .then( result => {setAuthUser(result.data.User); setErrors(result.data.resultMsg)})
        .catch(errors => {
            handleErrors(errors);
        })
    }

    const getUser = async() => {
        await axios.get('http://localhost:4000/User/Get/' + authUser.User_ID)
        .then( result => setAuthUser(result.data));
    }

    const signOut = () => {
        setAuthUser(null);
        navigate('/SignIn')
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
import { useContext, useEffect } from 'react';
import CustomForm from '../Utility/Forms/CustomForm'
import UserContext from '../../contex/userContext';

const UserSignUp = () => {
    const { authUser , actions} = useContext(UserContext);
    useEffect(()=>{
        if(authUser) actions.navigate('/Chat')
    }, [])
    return (
        <div className="row justify-content-center signUpIn">
            <CustomForm 
                legend={"Sign Up"}
                inputs={[
                    {
                        label: 'Username',
                        type: 'text',
                        name: 'Username'
                    },
                    {
                        label: 'Email',
                        type: 'email',
                        name: 'Email'
                    },
                    {
                        label: 'Password',
                        type: 'password',
                        name: 'Password'
                    },
                    {
                        label: 'Confirm Password',
                        type: 'password',
                        name: 'confirmedPassword'
                    },
                ]}
                button={[{title: "Sign Up", tpye: 'submit'}]}
                Size={''}
                Oauth={[{type: 'google', icon: 'square-google-plus'}, {type: 'twitter', icon: 'twitter'}]}
            />
        </div>
    )
}

export default UserSignUp;
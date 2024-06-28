import { useContext, useEffect } from 'react';
import CustomForm from '../Utility/Forms/CustomForm'
import UserContext from '../../contex/userContext';

const UserSignUp = () => {
    const { authUser , actions } = useContext(UserContext);
    useEffect(()=>{
        if(authUser) actions.navigate('/Chat') 
    }, [])
    return (
        <div className="row justify-content-center signUpIn">
            <CustomForm 
                legend={"Sign In"}
                inputs={[
                    {
                        label: 'Username',
                        type: 'text',
                        name: 'Username'
                    },
                    {
                        label: 'Password',
                        type: 'password',
                        name: 'Password'
                    },
                ]}
                button={[{title: "Sign In", tpye: 'submit'}]}
                Size={''}
            />
        </div>
    )
}

export default UserSignUp;
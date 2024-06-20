import { useContext } from "react";
import UserContext from "../contex/userContext";
import CustomForm from './Utility/custom_form/CustomForm'

const UserSignUp = () => {
    const { actions , errors } = useContext(UserContext);

    return (
        <div className="row justify-content-center">
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
import CustomForm from '../Utility/Forms/CustomForm'

const UserSignUp = () => {
    return (
        <div className="row justify-content-center">
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
            />
        </div>
    )
}

export default UserSignUp;
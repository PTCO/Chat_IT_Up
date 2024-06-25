import CustomForm from '../Utility/Forms/CustomForm'

const UserSignUp = () => {
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
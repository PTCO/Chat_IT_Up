import CustomForm from "../../Utility/Forms/CustomForm";

const Change_Profile = () => {
    return(
        <CustomForm 
            legend={"Update Username"}
            inputs={[
                {
                    type: 'text',
                    name: 'currentUsername',
                    label: 'Current Username',
                },
                {
                    type: 'text',
                    name: 'newUsername',
                    label: 'New Username'
                },
                {
                    type: 'password',
                    name: 'Password',
                    label: 'Enter Password'
                }
            ]}
            button={[{title: "Change", tpye: 'submit'}]}
            Size={''}
        />
    )
}

export default Change_Profile;
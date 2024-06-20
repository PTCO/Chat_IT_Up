import CustomForm from "../Utility/custom_form/CustomForm";

const Change_Password = () => {
    return(
        <CustomForm 
            legend={"Update Password"}
            inputs={[
                {
                    type: 'text',
                    name: 'Password',
                    label: 'Current Password',
                },
                {
                    type: 'password',
                    name: 'newPassword',
                    label: 'New Password'
                },
                {
                    type: 'password',
                    name: 'confirmedPassword',
                    label: 'Confirm Password'
                }
            ]}
            button={[{title: "Change", tpye: 'submit'}]}
            Size={''}
        />
    )
}

export default Change_Password;
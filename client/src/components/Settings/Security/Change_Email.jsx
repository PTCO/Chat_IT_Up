import CustomForm from "../../Utility/Forms/CustomForm";

const Change_Email = () => {
    return(
        <CustomForm 
            legend={"Update Email"}
            inputs={[
                {
                    type: 'text',
                    name: 'currentEmail',
                    label: 'Current Email',
                },
                {
                    type: 'text',
                    name: 'newEmail',
                    label: 'New Email'
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

export default Change_Email;
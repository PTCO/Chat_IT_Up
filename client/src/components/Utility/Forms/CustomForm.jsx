import React, { act, useContext, useEffect } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contex/userContext";
import ThemeContext from "../../../contex/themeContext";

import './CSS/Form.css'

const CustomForm =  ({ inputs , legend, button, Size}) => {
    const { actions  , errors } = useContext(UserContext);
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(()=>{
        actions.setErrors([]);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {};
        const elements = document.querySelectorAll('input[name]');
        elements.forEach( el => {
            if(el.value){
                formData[el.name] = el.value;
            }
        });

        if(legend === 'Sign Up') await actions.signUp(formData);
        else if(legend === 'Update Username') await actions.updateProfile('Username', formData);
        else if(legend === 'Update Email') await actions.updateProfile('Email', formData);
        else if(legend === 'Update Password') await actions.updateProfile('Password', formData);
        else await actions.signIn(formData);   
    }

    return (
        <form onSubmit={ e => handleSubmit(e)} className={`d-flex flex-column p-2 ${Size === 'lg' ? 'formLG' : 'formSm'} mb-4 col-10 ${darkMode ? 'text-white':null}`}>
            <legend className="display-4 border-bottom border-3 pb-1 mb-3">{ legend }</legend>
            { inputs.map( (input, index) => (
                <FormInput
                    Size={Size} 
                    key={index} 
                    type={input.type} 
                    name={input.name}
                    label={input.label} 
                    id={index} 
                    value={input.value} 
                    orientation={input.orientation} 
                    checkboxValues={input.checkboxValues ? input.checkboxValues: ''} 
                    RadioValues={input.RadioValues ? input.RadioValues: ''}
                />
            ))
            }
            <span className="d-flex align-items-center">
            {button.map( btn => (
                <button 
                    key={btn.title} 
                    type={btn.type} 
                    onClick={ e => `${btn.path ? navigate(btn.path) : null}`} 
                    className="btn fs-6 btn-dark mt-4 w-50 mx-2 me-md-2">
                    { btn.title }
                </button>
            ))}
            </span>
            {errors.map( error => (
                <h3 key={error} className="mt-4 border rounded p-1 errorMsg">{ error }</h3>
            ))}
        </form>
    )
}

export default CustomForm;
import React, { useState } from "react";
import CheckBoxOptions from "./CheckBoxOptions";
import RadioOptions from "./RadioOptions";
import { useLocation } from "react-router-dom";

const FormInput = ({ type, label, name, checkboxValues, radioValues, orientation}) => {
    const [ toggle, setToggle] = React.useState(false);
    const [ textInput, setTextInput] = React.useState("");

    const location = useLocation();

    const [strength, setStrength ] = useState([])

    const pwdStrengthChecker = (val) => {
        let counter = [1];
        if(/^\S{8,16}/gm.test(val)) {
            if(/[A-Z]/gm.test(val)) counter.push(1);
            if(/[a-z]/gm.test(val)) counter.push(1);
            if(/[1-9]/gm.test(val)) counter.push(1);
            if(/[$&+,:;=?@#|'<>.^*()%!-]/gm.test(val)) counter.push(1);
            // counter.push(1);
        }
        setStrength(counter)
    }


    const base64 = (obj) => {
        let reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);
        reader.onload = function () {
            setTextInput(reader.result)
        }
    }

    if(type === 'toggle'){
        return (
            <span className="d-flex justify-content-center align-items-center border border-3 p-1 mt-3 rounded">
                <label htmlFor={label} className="me-2">{ label }</label>
                <i  className={`fa-solid ${toggle ? 'fa-toggle-on text-success':'fa-toggle-off'} fs-4 pt-1`} onClick={ e => setToggle(pre => pre = !pre)}>
                    <input type="text" name={name} value={toggle} className="d-none"/>
                </i>
            </span>
        );
    } else if ( type === 'checkbox'){    
        return (    
            <ul className={`d-flex ${orientation === 'Vert' ? "flex-column ": ''} border border-3  mt-4 p-1 rounded`}>
                { checkboxValues.map( (checkboxVal, index) => (
                    <CheckBoxOptions key={index}  value={checkboxVal} name={name} />
                ))
                }
            </ul>
        )
    } else if ( type === 'radio'){
        return (    
            <div className={`d-flex ${orientation === 'Vert' ? "flex-column ": ''} border border-3  mt-4 p-1 rounded`}>
                { radioValues.map( (RadioVal, index) => (
                    <RadioOptions key={index} value={RadioVal} />
                ))
                }
            </div>
        )
    } else if ( type === 'file-photo'){
        return (
            <>
                <label htmlFor={label} className="d-flex flex-wrap justify-content-center align-items-center mt-4 border border-3  p-2 w-100 rounded">
                    <img src={textInput} alt="" className="rounded formImgPreview mb-4"/>
                    <p className="fs-3 formFileInputText w-100">{ label }<i className="fa-solid fa-file fs-2 border border-2 p-2 ms-2 rounded formFileInput"></i></p>
                </label>
                <input  type="file" id={label} className="rounded p-1 border border-3 d-none" onChange={ e => base64(e.target)}/>  
                <input  type="text" value={textInput} name={name} onChange={ e => console.log(e)} className="rounded p-1 border border-3 d-none"/>  
            </>            
        )
    } else {
        return (
            <>
                <label htmlFor={label} className="my-1">{ label }</label>
                <input  type={type} value={textInput} name={name} className="rounded p-1 border border-3" onChange={ e => {pwdStrengthChecker(e.target.value); setTextInput(e.target.value)}}/>  
                <div className={`${name === 'Password' && textInput && location.pathname === '/SignUp' ? null:'d-none'} mt-1 text-start p-2 pb-0 pwdStrength`} style={{fontSize: '.7rem'}}>
                    <span className="d-flex align-items-center border-bottom border-2 pb-2 mb-2">
                        <h3 className="m-0 me-2 border-end border-2 pe-2">Strength</h3>
                        {strength.map(point => {return ( <i key={point} className={`${point !== 1 ? 'fa-regular':'fa-solid'} fa-circle fa-lg mx-1`} style={{color: 'rgb(180 128 251)'}}></i>)})}
                        <p className="m-0 p-1 ms-2 border border-2 rounded">{strength.length <= 3 ? 'Weak':`${strength.length < 5 ? 'Moderate':'Strong'}`}</p>
                    </span>
                    <p>Password length between - <b className="p-1 rounded text-white" style={{backgroundColor: '#f8b231'}}>8-16 characters</b></p>
                    <p>Use - <b className="p-1 rounded text-white" style={{backgroundColor: 'rgb(180 128 251)'}}>Cap Characters & Numbers</b></p>
                    <p className="mb-1">Use special characters - <b className="p-1 bg-dark rounded text-white">$&+,:;=?@#|'.^*%!</b> </p>
                </div>
            </>
        );
    }
}

export default FormInput;
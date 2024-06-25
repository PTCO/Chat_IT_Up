import React from "react";
import CheckBoxOptions from "./CheckBoxOptions";
import RadioOptions from "./RadioOptions";

const FormInput = ({ type, label, name, checkboxValues, radioValues, orientation}) => {
    const [ toggle, setToggle] = React.useState(false);
    const [ textInput, setTextInput] = React.useState("");

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
                <label htmlFor={label} className="mb-2">{ label }</label>
                <input  type={type} value={textInput} name={name} className="rounded p-1 border border-3" onChange={ e => setTextInput(e.target.value)}/>  
            </>
        );
    }
}

export default FormInput;
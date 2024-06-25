import React from "react";

const RadioOptions = ({value}) => {
    const [ radio , setRadio ] = React.useState("");


    return (
            <label className="radio mx-2" onClick={ e => setRadio(value)}>{ value } 
                <input type="radio" name="radio" value={radio} className="ms-2"/>
                <span className="checkmark" ></span>
            </label>
    )
}

export default RadioOptions;
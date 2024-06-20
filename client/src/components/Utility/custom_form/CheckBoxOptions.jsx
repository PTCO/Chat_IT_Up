import React from "react";

const CheckBoxOptions = ({value , name}) => {
    const [ check, setCheck ] = React.useState("");

    return (
        <label className="radio mx-2"> { value }
            <input type="checkbox" name={name} value={value}/>
            <span className="checkmark checkmark-check border border-2 border-dark" onClick={ e => setCheck(value)}></span>
        </label>
    )
}

export default CheckBoxOptions;
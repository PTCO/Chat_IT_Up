import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../../contex/themeContext";

const Option = ({Icon , Url}) => {
    const { accentColor } = useContext(ThemeContext);
    return (
        <NavLink 
            to={Url} 
            end  
        >
        {({ isActive  }) => (
            <i 
            className={`fa-solid ${ Icon  } btn btn-dark ${isActive ? "active border-white" : ""} mx-2 NavIcons ` } 
            style={isActive ? {background:  accentColor}:null}></i>
        )}
        </NavLink>
    )
}

export default Option;
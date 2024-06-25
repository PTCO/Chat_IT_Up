import { useContext } from "react";
import ThemeContext from "../../../../contex/themeContext";

const Dark_Mode = () => {
    const { darkMode , actions } = useContext(ThemeContext);

    return(
        <span  className={`d-flex align-items-center form-check   ${ darkMode ? 'border border-white':null} boxShadow  p-2 w-auto me-auto mt-3 rounded`}>
            <i className={`fa-solid ${darkMode ? 'fa-toggle-on text-white':'fa-toggle-off'}`} style={{fontSize: '2.15rem'}} onClick={ e => actions.setDarkMode(pre => !pre)} id="isDarkMode"></i>
            <label className={`d-flex  align-items-center ms-2 fs-2 pb-1 ${ darkMode ? 'text-white':null}`} htmlFor="isDarkMode"><h3 className="m-0 me-2">Dark Mode </h3><i className="fa-regular fa-moon fa-lg "></i></label>
        </span>
    )
}

export default Dark_Mode;
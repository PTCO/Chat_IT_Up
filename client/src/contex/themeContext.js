import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie';

const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const cookie = Cookies.get("defaultTheme");
    const defaultTheme = cookie ? JSON.parse(cookie) : {
        accentColor: '#b480fb'
    }
    const [ accentColor, setAccentColor] = useState(defaultTheme.accentColor);
    const [ darkMode, setDarkMode ] = useState(defaultTheme.darkMode);

    useEffect(()=>{
        if(darkMode){
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark')
        }
        const theme = {
            accentColor,
            darkMode
        }
        Cookies.set("defaultTheme", JSON.stringify(theme));
    }, [accentColor, darkMode])

    return (
        <ThemeContext.Provider value={{
            accentColor,
            darkMode,
            actions: {
                setAccentColor,
                setDarkMode
            }
        }}>
        {props.children}
        </ThemeContext.Provider>
    )
} 

export default ThemeContext;
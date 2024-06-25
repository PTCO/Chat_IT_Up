import { useContext } from 'react';
import { TwitterPicker } from 'react-color';
import ThemeContext from '../../../../contex/themeContext';

const Accent_Color = () => {
    const { accentColor , darkMode, actions } = useContext(ThemeContext);

    return(
        <div className='d-flex flex-column align-items-start w-100 mt-3'>
            <h3 className={`${darkMode ? 'text-white':null}`}>Accent Color</h3>
            <TwitterPicker 
                triangle="hide"
                className={` w-100 ${darkMode ? ' dark border border-white':null}`}
                styles={{ 'default': { input: { color: null, boxSizing: null } } }}
                colors={['#F78DA7', '#FF5E5E', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#63537d']}
                color={accentColor}
                onChange={(color) => actions.setAccentColor(color.hex)}
            />
            <button className='btn bg-dark border-dark rounded mt-2 text-white' onClick={ e => actions.setAccentColor("#b480fb")}>Reset</button>
        </div>
    )
}

export default Accent_Color;
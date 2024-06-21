import { useContext, useEffect, useState } from "react";
import Accent_Color from "./theme/Accent_Color";
import Dark_Mode from "./theme/Dark_Mode";
import UserContext from "../../contex/userContext";
import ThemeContext from "../../contex/themeContext";

const Customize = () => {
    const { authUser , actions } = useContext(UserContext);
    const { darkMode } = useContext(ThemeContext);

    const [ errorMsg, setErrorMsg] = useState(null);
    const [photo, setPhoto ] = useState(null);

    const base64 = async  (obj) => {
        setErrorMsg(null);
        if(obj.files[0] === undefined) return
        if(obj.files[0].size > 40000) {
            setPhoto(null)
            return setErrorMsg("File size to large")
        }
        let reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);
        reader.onload = () => {
            setPhoto(reader.result)
        }
    } 
    
    useEffect(()=>{
        setErrorMsg(null);
        setPhoto(null);
    }, [])

    return (
        <>
            <div className="w-100">
                <div className={`${ darkMode ? 'text-white':null}  w-100 mt-2`}>
                    <label className={`${ darkMode ? 'bg-dark border-white':null} d-flex align-items-center w-100 my-2 border p-2 rounded boxShadow `}  htmlFor="photo">
                        <img className="userChangePortrait rounded-circle me-2" src={photo ? photo:authUser.Portrait} alt="" />
                        <h2>Change Portrait</h2>
                        <input type="file" className="d-none" id="photo" disabled={ photo ? true:false}  onChange={ e => base64(e.target)}/>
                    </label>
                    <p className={`${errorMsg ? null:'d-none'} errorMsg rounded mt-3 mb-4 fs-3`}>{errorMsg}</p>
                </div>
                <div className={`${photo ? null:'d-none'}  w-100 text-start mt-2 mb-4`}>
                    <p className="m-0 mb-1">Confirm Changes?</p>
                    <span>
                        <button className="btn btn-success me-2" onClick={ e => { actions.updateProfile('Portrait', {Portrait: photo}); setPhoto(null)}}>Confirm</button>
                        <button className="btn btn-danger" onClick={e => setPhoto(null)}>Cancel</button>
                    </span>
                </div>
                <Dark_Mode />
                <Accent_Color />
            </div>
        </>
    )
}

export default Customize;
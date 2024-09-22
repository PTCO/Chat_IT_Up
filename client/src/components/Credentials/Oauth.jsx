import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../contex/userContext";
import Cookie from "js-cookie";

const Oauth = () => {
    const { actions , authUser} = useContext(UserContext);
    const location = useLocation();
    useEffect(()=>{
        const sid = location.pathname.split("/")[2];
        if(!sid) {
            actions.navigate('/Login')
            return;
        }
        Cookie.set('ucs', JSON.stringify(sid), {secure: true, sameSite: 'Strict', expires: 7 * 24 * 60 * 60 * 1000});
        if(authUser) {
            actions.navigate('/Chat')
        }
    }, [])
}

export default Oauth;
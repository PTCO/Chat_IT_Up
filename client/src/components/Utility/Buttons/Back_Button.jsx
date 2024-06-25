import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../../contex/userContext";

const Back_Button = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <span className={`${location.pathname === '/Chat/Settings' ? 'd-none':'d-flex'} justify-content-end w-100 border-bottom border-2 pb-2 mb-2`}>
            <button className="btn btn-dark" onClick={ e => {navigate(-1); actions.setErrors([])}}>Back</button>
        </span>
    )
}

export default Back_Button;
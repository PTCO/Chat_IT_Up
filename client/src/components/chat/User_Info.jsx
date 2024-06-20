import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../../contex/sessionContext";

const User_Info = ({ Username , Portrait}) => {
    const { actions } = useContext(SessionContext);

    const navigate = useNavigate();
    return (
        <div className=" d-flex pb-2 mt-3 mb-1 align-items-center border-bottom border-3">
            <img src={ Portrait } alt="" className="userPortrait rounded-circle me-2"/>
            <h1 className="mb-0 fw-bold fs-3">{ Username ? Username.substring(0, 5):null}<b style={{color: "#b480fb"}}>{Username ? Username.substring(5, 8):null}</b><b style={{color: "#f8b231"}}>{Username ? Username.substring(8, 15):null}</b></h1>
            <button type="button" onClick={ e => {actions.setSession({}); navigate(-1)}} className="btn bg-dark text-white border-dark ms-auto fs-sm-6 ">BACK</button>
        </div>
    );
}

export default User_Info;
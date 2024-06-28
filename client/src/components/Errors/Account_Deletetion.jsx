import React, {useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Account_Deletetion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    if(location.state === 'Deleting'){
        return (
            <div className="colorFullBorders mx-4 p-2 rounded">
                <h1 className=" text-center border-bottom border-2 pb-2 mb-2">Account Deleted Successfully</h1>
                <p className="m-0" style={{color: "rgb(180 128 251)"}}>Sorry to see you go</p>
                <p>whenever you return, you can <b>Sign Backup </b> quick to get back up to speed chatting with your fellow Users!</p>
                <h4 style={{color: "#f8b231"}}>Your being returned to the Sign In Page <i class="fa-solid fs-2 ms-1 fa-spinner fa-spin" style={{color: "rgb(180 128 251)"}}></i></h4>
            </div>
        )
    } else {
        return (
            <NotFound />
        )
    }
}

export default Account_Deletetion;
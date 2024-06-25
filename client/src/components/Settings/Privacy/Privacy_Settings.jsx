import { Link } from "react-router-dom";
import Private_Setting from "./Private_Setting";
import { useContext } from "react";
import UserContext from "../../../contex/userContext";

const Privacy_Settings = ( ) => {
    const { authUser } = useContext(UserContext);
    return(
        <>
            <Private_Setting />
            <Link to={"ChatRequest"} className={`d-flex btn btn-dark text-white w-100 mb-3 py-3 align-items-center justify-content-center`}>Add & Chat Request</Link>
        </>
    )
}

export default Privacy_Settings;
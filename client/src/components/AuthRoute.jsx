import { useContext } from "react";
import UserContext from "../contex/userContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
    const { authUser } = useContext(UserContext);

    const location = useLocation();

    if(authUser) {
        return <Outlet />
    } else {
        return <Navigate to={"/SignIn"} state={{from: location.pathname}}/>
    }
}

export default AuthRoute;
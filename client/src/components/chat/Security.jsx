import { Link, Outlet, useLocation } from "react-router-dom";

const Security = () => {
    const location = useLocation(null);

    return (
        <>
            <div className={`${location.pathname !== '/Chat/Settings/Security' ? 'd-none':null} mt-2 w-100`}>
                <Link className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center " to={"ChangeUsername"}>Change Username</Link>
                <Link className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center " to={"ChangeEmail"}>Change Email</Link>
                <Link className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center "to={"ChangePwd"}>Change Password</Link>
            </div>
            <Outlet />
        </>
    )
}

export default Security;
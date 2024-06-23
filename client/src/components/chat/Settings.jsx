import { Link, Outlet, useLocation } from "react-router-dom";
import Navigation from './Navigation';
import Back_Button from "./Back_Button";

const Settings = () => {
    const location = useLocation();

    return (
        <>
        <div className={`${location.pathname !== '/Chat/Settings' ? 'd-none': 'd-flex'} flex-column align-items-center settings  mt-2 px-4`}>
            <div className='d-flex justify-content-center mb-3'>
                <Navigation 
                    Options={['fa-message', 'fa-square-plus', 'fa-cog']} // Place font awsome 2nd set of class values here for desired icons
                    URLs={['/Chat', '/Chat/Add', '/Chat/Settings']} // Set where each icon nav option navigates to
                    Size={""} // controls icon size possible values - ( "sm", "md", "lg", "xlg", "2x")
                    Orientation={"Horiz"} // options ("Horiz", "Vert")
                    Width={"20em"} // Sets width of Nav container
                /> 
            </div>
            <Link to={"Customization"} className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center">Customize<i className="fa-solid fa-palette fs-4 ms-2"></i></Link>
            <Link to={"Security"} className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center">Security<i className="fa-solid fa-fingerprint fs-4 ms-2"></i></Link>
            <Link to={"Privacy"} className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center">Privacy<i className="fa-solid fa-mask fs-4 ms-2"></i></Link>
            <Link to={"Help"} className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center">Help<i className="fa-solid fa-circle-question fs-4 ms-2"></i></Link>
            <Link to={"Account"} className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center">Account<i class="fa-solid fa-address-card fs-4 ms-2"></i></Link>
            <Link to={"About"} className="btn btn-dark text-white w-100 mb-3 py-3 d-flex align-items-center justify-content-center">About<i className="fa-solid fa-circle-info fs-4 ms-2"></i></Link>
        </div>
        <div className="d-flex flex-column align-items-center settings px-4">
            <Back_Button />
            <Outlet />
        </div>
        </>
    )
}

export default Settings;
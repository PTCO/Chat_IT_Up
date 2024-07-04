import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return (
        <footer className={`${location.pathname.includes('Chat/Session') ? 'd-none':'d-flex'} align-items-center justify-content-center py-2 text-center border-top border-3 mx-4 mt-auto`}>
            <Link className={`text-white rounded ${location.pathname.includes('/Chat/Settings/About') ? 'd-none':null}`} to={"https://www.facebook.com/profile.php?id=61559539658958"}>
                <i className="fa-brands fa-facebook fs-3 p-2"></i>
            </Link>
            <Link className={`bg-dark text-white rounded mx-4 ${location.pathname.includes('/Chat/Settings/About') ? 'd-none':null}`} to={"https://x.com/BrandonDurand16"}>
                <i className="fa-brands fa-twitter fs-3 p-2"></i>
            </Link>
            <Link className={`text-white rounded aboutContactLinks ${location.pathname.includes('/Chat/Settings/About') ? 'd-none':null}`} to={"mailto:ptco.dev@gmail.com"}>
                <i className="fa-solid fa-envelope fs-3 p-2"></i>
            </Link>
            <p className={`m-0  ${!location.pathname.includes('/Chat/Settings/About') ? 'ms-4 ps-3 border-start border-2':null}  fs-4`}><small>&copy; PTCO</small></p>
        </footer>
    );
}

export default Footer;
import { useContext } from "react";
import ThemeContext from "../../../contex/themeContext";
import { Link } from "react-router-dom";

const About = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div className={`${darkMode ? 'text-white':''} mt-2 about`}> 
            <h2 className={`${darkMode ? 'bg-dark':null} colorFullBorders border border-2 p-1 rounded`}>About Us</h2>
            <div className="d-flex align-items-center mt-3 mb-3">
                <p className="m-0 me-3 pe-3 border-end border-2 w-100 fs-5">Find <b>Users</b> to engage and chat about bfrivouslous, <b>fun</b>, unique and <b>intriguing</b> topics!</p>
                <i class="fa-regular fa-comments fa-shake fa-2x ms-auto"></i>
            </div>
            <div className="d-flex align-items-center mb-3">
                <p className="m-0 me-3 pe-3 border-end border-2 w-100 fs-5">Maybe you don't find the <b>conversation</b> to your liking, that's fine <b>remove</b> or <b>stop</b> chatting to users deemed <b>unworthy</b> of a conversation and start up new ones!</p>
                <i class="fa-solid fa-users-slash fa-beat fa-2x"></i>
            </div>
            <div className="d-flex align-items-center">
                <p className="m-0 me-3 pe-3 border-end border-2 w-100 fs-5">Don't like being hit up by <b>"undesired"</b>  individuals, set your account to <b>private</b> to avoid the unimporant convos!</p>
                <i class="fa-solid fa-eye-low-vision fa-fade fa-2x"></i>
            </div>
            <h2 className={`${darkMode ? 'bg-dark':null} colorFullBorders border border-2 p-1 rounded mt-3 `}>Contact Us</h2>
            <div className="d-flex align-items-center pt-2">
                <Link className="text-white rounded" to={"https://www.facebook.com/profile.php?id=61559539658958"}>
                    <i class="fa-brands fa-facebook fs-1 p-2"></i>
                </Link>
                <Link className="btn bg-white border-0 ms-2" to={"https://www.facebook.com/profile.php?id=61559539658958"}>
                    <p className="m-0 ms-2">Connect with us on Facebook</p>
                </Link>
            </div>
            <div className="d-flex align-items-center pt-2">
                <Link className="bg-dark text-white rounded" to={"https://x.com/BrandonDurand16"}>
                    <i class="fa-brands fa-twitter fs-1 p-2"></i>
                </Link>
                <Link className="btn bg-white border-0 ms-2" to={"https://x.com/BrandonDurand16"}>
                    <p className="m-0 ms-2">Connect with us on Twitter / X</p>
                </Link>
            </div>
            <div className="d-flex align-items-center pt-2">
                <Link className="text-white rounded aboutContactLinks" to={"mailto:ptco.dev@gmail.com"}>
                    <i className="fa-solid fa-envelope fs-1 p-2"></i>
                </Link>
                <Link className="btn bg-white border-0 ms-2" to={"mailto:ptco.dev@gmail.com"}>
                    <p className="m-0 ms-2">Connect with us through Mail</p>
                </Link>
            </div>
        </div>
    )
}

export default About;
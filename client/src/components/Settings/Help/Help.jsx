import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../../contex/themeContext";

const Help = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className="d-flex align-items-center flex-column w-100">
            <nav className="w-100">
                <h2 className={`${darkMode ? 'bg-dark text-white':null} border border-2 p-1 mt-2 mb-4 colorFullBorders rounded`}>Common Questions</h2>
                <ul className="helpQuestions">
                    <li><Link to={"PrivatePage"}>How to see "Add & Chat" requests?</Link></li>
                    <li><Link to={"RequestsPage"}>How to "Decline" or "Accept" Chat requests?</Link></li>
                    <li><Link to={"ChatPage"}>How to stop a chat with someone?</Link></li>
                    <li><Link to={"ChatPage"}>How to open a chat?</Link></li>
                    <li><Link to={"SearchPage"}>How to search for new users to chat with?</Link></li>
                    <li><Link to={"SearchPage"}>How to "Add" or "Request" to Chat to "Users"?</Link></li>
                    <li><Link to={"PrivatePage"}>How to enable/disable "Private Account" mode</Link></li>  
                    <li><Link to={"ChatViewPage"}>How to delete texts?</Link></li>
                    <li><Link to={"ChatViewPage"}>How to send new texts?</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Help;
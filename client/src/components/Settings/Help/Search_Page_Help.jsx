import searchBarPhoto from './images/Search_Bar.png'
import addUserPhoto from './images/User_Add.png'
import requestUserPhoto from './images/User_Request.png'

const Search_Page_Help = () => {
    return (
        <div className="d-flex flex-column text-start overflow-auto" style={{ height: "40em"}}>
            <h1 className="border-bottom border-2 mb-2 pb-2 ">Search Page Help</h1>
            <div className="d-flex flex-column  helpInfo">
                <div>
                    <p>Enter a <b>Username</b> or characters to search for new <b>"Users"</b> to <b>"Add & Chat"</b> with. The most relevant or closest matched results will be returned.</p>
                    <img src={searchBarPhoto} alt="" />
                </div>
                <div className=" border-top border-2 mt-3 pt-3">
                    <p>If the <b>"User's"</b> account is not <b>"Private"</b>, you can add after searching their account.</p>
                    <img src={addUserPhoto} alt="" />
                </div>
                    <div className=" border-top border-2 mt-3 pt-3">
                    <p>If the <b>"User"</b> has set their account to <b>"Private"</b>, you'll have to request to chat to them.</p>
                    <img src={requestUserPhoto} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Search_Page_Help;
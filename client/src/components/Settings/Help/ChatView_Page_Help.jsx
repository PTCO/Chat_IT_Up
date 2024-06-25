import dropdownMessagePhoto from './images/dropdownMessage.png'
import sendNewMessagePhoto from './images/sendNewMessage.png'

const ChatView_Page_Help = () => {
    return (
        <div className="d-flex flex-column text-start overflow-auto" style={{ height: "40em"}}>
            <h1 className="border-bottom border-2 mb-2 pb-2 ">Chat View Page Help</h1>
            <div className="d-flex flex-column  helpInfo overflow-auto">
                <div>
                    <p>Click <i className="fa-regular fa-square-caret-down p-2 fs-6  me-1" /> to reveal the  option, to <i className="fa-regular fa-trash-can fs-6 btn btn-dark" /> <b>"Delete</b> sent <b>"Message"</b> .</p>
                    <img src={dropdownMessagePhoto} alt="" className='mt-2'/>
                </div>
                <div className=" border-top border-2 mt-3 pt-3">
                    <p><b>Enter</b> and <b>"Send"</b> new <b>"Messages"</b> with the Chat Input at the bottom of the page.</p>
                    <img src={sendNewMessagePhoto} alt="" className='mt-2'/>
                </div>
            </div>
        </div>
    )
}

export default ChatView_Page_Help;
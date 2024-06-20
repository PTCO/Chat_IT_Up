import chatRequestPhoto from './images/chatRequests.png'
import chatRequestRecievedPhoto from './images/chatRequestRecieved.png'
import refreshRequestsPhoto from './images/refreshRequests.png'

const Requests_Page_Help = () => {
    return (
        <div className="d-flex flex-column text-start overflow-auto" style={{ height: "40em"}}>
            <h1 className="border-bottom border-2 mb-2 pb-2 ">Request Page Help</h1>
            <div className="d-flex flex-column  helpInfo overflow-auto">
                <div>
                    <p>Click the <b>"Cancel"</b> option, to stop requesting to chat to the intended <b>"User</b>.</p>
                    <img src={chatRequestPhoto} alt="" className='mt-2'/>
                </div>
                    <div className=" border-top border-2 mt-3 pt-3">
                    <p>Here you can see your <b>"Add & Chat"</b> request you have <b>"Recieved"</b>. Click the <b>"Accept"</b> option to <b>"Start"</b> or <b>"Decline"</b> option to <b>"Deny</b> a chat session with the intended <b>"User</b>.</p>
                    <img src={chatRequestRecievedPhoto} alt="" className='mt-2'/>
                </div>
                    <div className=" border-top border-2 mt-3 pt-3">
                    <p>Click "<i className="fa-solid fa-rotate border border-2 p-2 rounded"/>" to <b>"Refresh"</b> and see <b>"New"</b> requests <b></b>.</p>
                    <img src={refreshRequestsPhoto} alt=""/>
                </div>

            </div>
        </div>
    )
}

export default Requests_Page_Help;
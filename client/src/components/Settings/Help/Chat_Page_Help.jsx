import chatSessionPhoto from './images/chatSessionPhoto.png';
import dropDownPhoto from './images/dropDownPhoto.png';
import stopChatPhoto from './images/stopChatPhoto.png';
import chatRequestAndSessionRefreshPhoto from './images/chatRequestAndSessionRefresh.png';

const Chat_Page_Help = () => {
    return (
            <div className="d-flex flex-column text-start helpInfo overflow-auto">
                <h1 className="border-bottom border-2  mb-2 pb-2 ">Chat Page Help</h1>
                <div className="d-flex flex-column  ">
                    <div>
                        <p>Click on a <b>"Username"</b> or <b>"User</b> to open the <b>"Chat View"</b> to the chat's messages.</p>
                        <img src={chatSessionPhoto} alt="" />
                    </div>
                    <div className=" border-top border-2 mt-3 pt-3">
                        <p>Click the "<i class="fa-solid fa-ellipsis-vertical fa-sm"></i>" to reveal the dropdwon menu to edit the chat.</p>
                        <img src={dropDownPhoto} alt="" />
                    </div>
                    <div className=" border-top border-2 mt-3 pt-3">
                        <p>Use the "<i class="fa-solid fa-user-slash fa-sm"></i>" option to <b>"Stop"</b> chatting to the intended <b>"User</b> .</p>
                        <img src={stopChatPhoto} alt="" />
                    </div>
                    <div className=" border-top border-2 mt-3 pt-3">
                        <p>Click <i class="fa-solid fa-user-plus border border-2 p-2 me-1 rounded" /> option to <b>"View"</b> chat request you've sent or recieved.</p>
                        <p>Click <i className="fa-solid fa-rotate border border-2 p-2 rounded" /> option to <b>"Refresh"</b> to update chat session list.</p>
                        <img className="mt-2" src={chatRequestAndSessionRefreshPhoto} alt="" />
                    </div>
                </div>
        </div>
    )
}

export default Chat_Page_Help;
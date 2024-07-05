import enablePrivateAccountPhoto from './images/enablePrivateAccount.png'
import disablePrivateAccountPhoto from './images/disablePrivateAccount.png'

const PrivateAccount_Page_Help = () => {
    return (
        <div className="d-flex flex-column text-start helpInfo overflow-auto">
            <h1 className="border-bottom border-2 mb-2 pb-2 ">Private Account Page Help</h1>
            <div className="d-flex flex-column  ">
                <div>
                    <p>Click the <i className="fa-regular fa-eye-slash border p-1 me-1 fs-5"/> to <b>"Set"</b> your <b>"Account"</b> To <b>"Private"</b>.</p>
                    <p>Here you can see your <b>"Add & Chat"</b> request you have <b>"Sent</b>. Click <b>"Add & Chat Request"</b> to navigate to Chat Request Page</p>
                    <img src={enablePrivateAccountPhoto} alt="" className='mt-2'/>
                </div>
                <div className=" border-top border-2 mt-3 pt-3">
                    <p>Click the <i className="fa-solid fa-eye-slash border p-1 me-1 fs-5"/> to <b>"Unset"</b> your <b>"Account"</b> from <b>"Private"</b>.</p>
                    <img src={disablePrivateAccountPhoto} alt="" className='mt-2'/>
                </div>
            </div>
        </div>
    )
}

export default PrivateAccount_Page_Help;
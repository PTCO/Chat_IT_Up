import React, { useRef } from "react";

const Message_Input = ({sendMessage}) => {
    const message = useRef("");
    return (
        <form onSubmit={ e => sendMessage(e, message.current.value) } className="d-flex align-items-center mt-4 chatMessageInput w-100">
            <input type="text" className="form-control rounded-0 rounded-start fs-6 fs-md-4" ref={message}/>
            <button type="submit" className="btn btn-dark rounded-0 rounded-end fs-6 fs-md-4"><i className="fa-regular fa-paper-plane"></i></button>
        </form>
    );
}

export default Message_Input;
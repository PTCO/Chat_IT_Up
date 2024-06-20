import React from "react";
import Message from "./Message";

const Messages = ({ Messages , deleteMessage, UserID }) => {
    return (
        <div className="d-flex flex-column align-items-end messagesContainer">
            { Messages.map( message => (
                <Message 
                    // Data
                    key={message.Message_ID} 
                    Message={message.Message} 
                    Time={message.Time} 
                    messageUserID={message.User_ID} 
                    messageID={message.Message_ID}

                    // Custom Inputs
                    yourUserID={UserID}
                    userOneColor={"#b480fb"} 
                    userTwoColor={"#f8b231"} 

                    // Functions
                    deleteMessage={deleteMessage}
                />
            ))}
        </div>
    );
}

export default Messages;
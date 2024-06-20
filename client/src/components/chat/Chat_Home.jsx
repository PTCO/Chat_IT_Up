import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import New_Chat from "./New_Chat";
import ChatView from "./ChatView";

const Home = ()=> {
    return(
        <>
            <Routes>
                <Route path="/">
                    <Route  path="Chat/:id" element={<Chat />}/>
                    <Route path="Chat/Add/:id" element={<New_Chat />} />
                    <Route path="Chat/Session/:id" element={<ChatView yourUsername={" your username goes here"}/>} />
                </Route>
                
            </Routes>
        </>
    )
}

export default Home;
import logo from './logo.svg';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp'
import UserSignIn from './components/UserSignIn'
import Chat from './components/chat/Chat'
import New_Chat from './components/chat/New_Chat'
import NotFound from './components/NotFound'
import Sessions from './components/chat/Sessions'
import ChatView from './components/chat/ChatView'
import Customize from './components/chat/Customize';
import Security from './components/chat/Security';
import AuthRoute from './components/AuthRoute';
import Settings from './components/chat/Settings';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import SessionContext from './contex/sessionContext';
import Change_Username from './components/chat/Change_Username';
import Change_Email from './components/chat/Change_Email';
import Change_Password from './components/chat/Change_Password';
import Privacy_Settings from './components/chat/Privacy_Settings';
import Chat_Requests from './components/chat/Chat_Requests';
import Help from './components/chat/Help';
import Search_Page_Help from './components/chat/Settings/Help/Search_Page_Help';
import Chat_Page_Help from './components/chat/Settings/Help/Chat_Page_Help';
import Requests_Page_Help from './components/chat/Settings/Help/Requests_Page_Help';
import PrivateAccount_Page_Help from './components/chat/Settings/Help/PrivateAccount_Page_Help';
import ChatView_Page_Help from './components/chat/Settings/Help/ChatView_Page_Help';
import Chat_Stopped from './components/chat/Chat_Stopped';
import About from './components/chat/About';
import Account from './components/chat/Account';

function App() {
  const { sessions } = useContext(SessionContext)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/SignUp' element={<UserSignUp />}/>
        <Route path='/SignIn' element={<UserSignIn />}/> 
        <Route element={<AuthRoute />}>
          <Route path='/Chat' element={<Chat />}>
            <Route index element={<Sessions Sessions={sessions}/>} />
            <Route path='/Chat/Add' element={<New_Chat />}/>
            <Route path='/Chat/Stopped' element={<Chat_Stopped />}/>
          </Route>
          <Route path='/Chat/Settings' element={<Settings />}>
            <Route path='Customization' element={<Customize />}/>
            <Route path='Security' element={<Security />}>
              <Route path='ChangeUsername' element={<Change_Username />}/>
              <Route path='ChangeEmail' element={<Change_Email />}/>
              <Route path='ChangePwd' element={<Change_Password />}/>
            </Route>
            <Route path='Privacy'>
              <Route index element={<Privacy_Settings />}/>
              <Route path='ChatRequest' element={<Chat_Requests />}/>
            </Route>
            <Route path='Help'>
              <Route index element={<Help />}/>
              <Route path='SearchPage' element={<Search_Page_Help />}/>
              <Route path='ChatPage' element={<Chat_Page_Help />}/>
              <Route path='RequestsPage' element={<Requests_Page_Help />}/>
              <Route path='PrivatePage' element={<PrivateAccount_Page_Help />}/>
              <Route path='ChatViewPage' element={<ChatView_Page_Help />}/>
            </Route>
            <Route path='About' element={<About />}/>
            <Route path='Account' element={<Account />}/>
          </Route>
          <Route path='/Chat/Session' element={<div className='px-4'><ChatView /></div>} />    
        </Route>
        <Route path='/' element={<UserSignIn />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;

// React
import { Route, Routes } from 'react-router-dom';
import React, { useContext, useState } from 'react';

// CSS
import './css/App.css';

// Context API
import SessionContext from './contex/sessionContext';

// Structure
import Header from './components/Structure/Header';

// SignUp & SignIn
import UserSignUp from './components/Credentials/UserSignUp'
import UserSignIn from './components/Credentials/UserSignIn'

// Auth Route
import AuthRoute from './components/Credentials/AuthRoute';

// Chat Home
import Chat from './components/Chat/Chats'

// Search
import New_Chat from './components/Chat/Search/New_Chat'

// Chat Sessions
import Sessions from './components/Chat/Sessions/Sessions'

// Chat View
import ChatView from './components/Chat/ChatView/ChatView'

// Chat Requests
import Chat_Requests from './components/Chat/Requests/Chat_Requests';

// Errors
import NotFound from './components/Errors/NotFound'
import Chat_Stopped from './components/Errors/Chat_Stopped';
import Loading from './components/Errors/Loading';

// Settings
import Account from './components/Settings/Account/Account';
import About from './components/Settings/About/About';
import Customize from './components/Settings/Customize/Customize';
import Security from './components/Settings/Security/Security';
import Settings from './components/Settings/Settings';
import Change_Username from './components/Settings/Security/Change_Username';
import Change_Email from './components/Settings/Security/Change_Email';
import Change_Password from './components/Settings/Security/Change_Password';
import Privacy_Settings from './components/Settings/Privacy/Privacy_Settings';

// Help
import Help from './components/Settings/Help/Help';
import Search_Page_Help from './components/Settings/Help/Search_Page_Help';
import Chat_Page_Help from './components/Settings/Help/Chat_Page_Help';
import Requests_Page_Help from './components/Settings/Help/Requests_Page_Help';
import PrivateAccount_Page_Help from './components/Settings/Help/PrivateAccount_Page_Help';
import ChatView_Page_Help from './components/Settings/Help/ChatView_Page_Help';

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
        <Route path='/Loading' element={<Loading />}/>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './css/index.css';
import { UserProvider } from './contex/userContext';
import { SessionProvider } from './contex/sessionContext';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contex/themeContext';
import { RequestProvider } from './contex/requestContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SessionProvider>
          <RequestProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </RequestProvider>
        </SessionProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

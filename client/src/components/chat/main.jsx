import React from 'react'
import ReactDOM from 'react-dom/client'
import Chat from './Chat'
import './index.css'
import './Search_Form.css'
import './Navigation.css'

import { BrowserRouter } from 'react-router-dom'
import Home from './Chat_Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./css/reset.css";
import { UserProvider } from "./context/UserContext.js"

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



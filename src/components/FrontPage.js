import React from 'react';

import Header from "./sharedComps/Header.js"
import Login from "./FrontPageComps/Login.js"
import Register from "./FrontPageComps/Register.js"

import "../css/frontpage.css";

function FrontPage() {


  return (
    <div className="frontPage">

      <Header />

      <section className="frontPageContainer">
        <div className="frontPage_loginRegister">
          <Login />
          <Register />
        </div>
      </section>

    </div>
  );
}

export default FrontPage;
import React, { useState, useEffect } from 'react';

import Header from "./sharedComps/Header.js"
import Login from "./FrontPageComps/Login.js"
import Register from "./FrontPageComps/Register.js"

import "../css/frontpage.css";

function FrontPage() {
    

    return (
        <div className="frontPage">
            
            <Header/>
            
            <div className="frontPage_loginRegister">
                <Login/>
                <Register/>
            </div>

        </div>
    );
}

export default FrontPage;
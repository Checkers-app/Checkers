import React, { useState, useEffect } from 'react';

import Login from "./Login.js"
import Register from "./Register.js"

import "../css/frontpage.css";

function FrontPage() {
    

    return (
        <div className="frontPage">
            
            <header>
                <h1>CHECKERS</h1>
            </header>
            
            <div className="frontPage_loginRegister">
                <Login/>
                <Register/>
            </div>

        </div>
    );
}

export default FrontPage;
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    
    useEffect(() => {
        console.log(username);
    }, [username])
    
    
    
    const signIn = () => {
        console.log("derp");
    }
    

    return (
        <div className="login">
            <header>
                <h1>CHECKERS</h1>
                <Link to = {`/register`}>SIGN UP</Link>
            </header>
        
            <div className = "login_inputs">
                <p>User Name:</p>
                <input type = "text" onChange = {e => setUsername(e.target.value)}/>
                <p>Password:</p>
                <input type = "password" onChange = {e => setPassword(e.target.value)}/>
                <button>SIGN IN</button>
            </div>

        </div>
    );
}

export default Login;
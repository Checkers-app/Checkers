import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*
    useEffect(() => {
        console.log(username);
    }, [username])
    */
    
    
    const signIn = () => {
        axios.post('/auth/login', {email, password})
        .then(user => {
           // useHistory().push("/home");
        })
        .catch(err => {
            alert(err.response.data);
        })
    }
    

    return (
        <div className="login">
            <header>
                <h1>CHECKERS</h1>
                <Link to = {`/register`}>SIGN UP</Link>
            </header>
        
            <div className = "login_inputs">
                <p>Email:</p>
                <input type = "text" onChange = {e => setEmail(e.target.value)}/>
                <p>Password:</p>
                <input type = "password" onChange = {e => setPassword(e.target.value)}/>
                <button onClick = {signIn}>SIGN IN</button>
            </div>

        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

import "../../css/register.css";

function Register() {


    let history = useHistory()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    
    const signUp = () => {
        
        axios.post('/auth/create', {username, email, password})
        .then(user => {
            history.push("/landingpage");
        })
        .catch(err => {
            alert(err.response.data);
        })
        
    }


    return (
        <div className="register">

            <div className="login_title">
                <p>New Players can create an account here:</p>
            </div>


            <div className = "register_inputs">
                <div>
                    <p>User Name:</p>
                    <input type = "text" onChange = {e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <p>Email:</p>
                    <input type = "text" onChange = {e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <p>Password:</p>
                    <input type = "password" onChange = {e => setPassword(e.target.value)}/>
                </div>
                
                <button onClick = {signUp}>REGISTER</button>
            </div>
        </div>
    );
}

export default Register;
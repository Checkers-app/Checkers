import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

function Register() {


    let history = useHistory()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    
    const signUp = () => {
        
        axios.post('/auth/create', {username, email, password})
        .then(user => {
            history.push("/rooms");
        })
        .catch(err => {
            alert(err.response.data);
        })
        
    }


    return (
        <div className="register">
            <div className = "register_inputs">
                <p>User Name:</p>
                <input type = "text" onChange = {e => setUsername(e.target.value)}/>
                <p>Email:</p>
                <input type = "text" onChange = {e => setEmail(e.target.value)}/>
                <p>Password:</p>
                <input type = "password" onChange = {e => setPassword(e.target.value)}/>
                <button onClick = {signUp}>REGISTER</button>
            </div>
        </div>
    );
}

export default Register;
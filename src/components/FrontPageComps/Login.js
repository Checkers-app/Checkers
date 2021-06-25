import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import "../../css/login.css";

function Login() {


    let history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {user, setUser} = useContext(UserContext);
    
    
    const signIn = () => {
        axios.post('/auth/login', {email, password})
        .then(user => {
            history.push("/landingpage");
            setUser({
                uid: user.data.uid,
                username: user.data.username,
                wins: user.data.wins,
                losses: user.data.losses
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    return (
        <div className="login">
            
            <div className="login_title">
                <p>Continuing Players can log in here:</p>
            </div>


            <div className = "login_inputs">
                <div>
                    <p>Email:</p>
                    <input type = "text" onChange = {e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <p>Password:</p>
                    <input type = "password" onChange = {e => setPassword(e.target.value)}/>
                </div>
                <button onClick = {signIn}>LOGIN</button>
            </div>

        </div>
    );
}

export default Login;
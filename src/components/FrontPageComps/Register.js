import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useHistory } from 'react-router-dom';

import "../../css/register.css";

function Register() {


    let history = useHistory()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useContext(UserContext);

    const signUp = () => {

        axios.post('/auth/create', { username, email, password })
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
                if (err.response.status === 405) {
                    toast.error('Please enter a valid Email!')
                } else if (err.response.status === 409) {
                    toast.error('That username is already taken')
                } else if (err.response.status === 423) {
                    toast.error('That email has already been registered')
                }
            })

    }


    return (
        <div className="register">

            <div className="login_title">
                <p>New Players can create an account here:</p>
            </div>


            <div className="register_inputs">
                <div>
                    <p>Username:</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <p>Email:</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <p>Password:</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </div>

                <button onClick={signUp}>REGISTER</button>
            </div>
        </div>
    );
}

export default Register;
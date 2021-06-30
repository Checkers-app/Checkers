import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import "../../css/login.css";

function Login() {


    let history = useHistory()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useContext(UserContext);


    const signIn = () => {
        axios.post('/auth/login', { username, password })
            .then(users => {
                console.log('successful')
                setUser({
                    uid: users.data.uid,
                    username: users.data.username,
                    wins: users.data.wins,
                    losses: users.data.losses
                });
                history.push("/landingpage");
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


            <div className="login_inputs">
                <div>
                    <p>Username:</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <p>Password:</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={signIn}>LOGIN</button>
            </div>

        </div>
    );
}

export default Login;
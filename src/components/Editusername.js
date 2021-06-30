import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
import Header from '../components/sharedComps/Header'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/editusername.css'

function Editusername() {


    let history = useHistory()

    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");

    let uid = user.uid;

    const editUsername = () => {
        axios.put('/auth/updateusername', { username, uid })
            .then(derp => {
                history.push("/profile");
            })

    }

    useEffect(() => {
        if (!user.uid) {
            console.log('no uid')
            console.log(user)
            history.push('/')
        }
    }, [])


    return (
        <div>
            <Header />
            <div className="editusername">
                <p>What would your like your username to be?????</p>

                <input className="editusername_input" type="text" placeholder={`${user.username}`} onChange={e => setUsername(e.target.value)} />
                <button onClick={editUsername}>submit</button>

            </div>

        </div>
    );
}

export default Editusername;
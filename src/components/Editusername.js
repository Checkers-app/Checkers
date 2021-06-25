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
    
    
   
    

    return (
        <div className="editusername">
            

        </div>
    );
}

export default Editusername;
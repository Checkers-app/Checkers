import React, { useState } from 'react';
import axios from 'axios';

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    
    
    
    const signUp = () => {
        
        
        axios.post('/auth/create', {username, email, password})
        .then(user => {
            
            console.log(user.data);
            /*
            if (user.data === "User not found" || user.data === "wrong password bro"){
                alert (user.data);
            }
            else{
                this.props.loginUser(user.data);
                this.props.history.push("/home");
            }
            */
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
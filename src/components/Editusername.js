import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
import Header from '../components/sharedComps/Header'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

function Editusername() {


    let history = useHistory()

    const {user, setUser} = useContext(UserContext);
    
    
   
    

    return (
        <div className="editusername">
            <Header/>

        </div>
    );
}

export default Editusername;
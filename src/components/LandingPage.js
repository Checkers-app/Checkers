import { Link } from 'react-router-dom';
import Header from "../components/sharedComps/Header.js";
import { CgProfile } from 'react-icons/cg';

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext.js'


function LandingPage() {

  // const {user, setUser} = useContext(UserContext);

  // console.log(user);

  return (
    <div className="rooms">
      <Header />
      <Link className='profileLink' to='/profile'>
        <CgProfile className='profileIcon' />
        <p className='profileText'>Profile</p>
      </Link>
      <Link to="/game">Create New Game</Link>
      
    </div>
  );
}
export default LandingPage;
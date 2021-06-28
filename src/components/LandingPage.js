import { Link } from 'react-router-dom';
import Header from "../components/sharedComps/Header.js";

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext.js'


function LandingPage() {

  // const {user, setUser} = useContext(UserContext);

  // console.log(user);

  return (
    <div className="rooms">
      <Header />
      <Link to="/game">Online kinda</Link>
      <Link to="/1pGame">Pass and Play</Link>
    </div>
  );
}
export default LandingPage;
import { Link } from 'react-router-dom';
import '../css/landingpage.css';
import Header from "../components/sharedComps/Header.js";
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
import axios from 'axios';


function LandingPage() {

  // const {user, setUser} = useContext(UserContext);

  // console.log(user);

  const logout = () => {
    axios.get("/auth/logout")
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="rooms">
      <Header className='header' />
      <section className="bottomContainer">
        <section className='gameLinks'>
          <p>Create a Game!</p>
          <section className="linkContainer">
            <Link to="/game">Online kinda</Link>
            <Link to="/1pGame">Pass and Play</Link>
          </section>
        </section>
        <section className='utilityLinks'>
          <Link to="/ProfilePage" >Profile</Link>
          <Link to="/" onClick={() => { logout() }}>Logout</Link>
        </section>
      </section>
    </div >
  );
}
export default LandingPage;
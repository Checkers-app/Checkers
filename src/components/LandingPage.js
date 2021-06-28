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
        <section className='linkMasterContainer'>
          <section className='gameLinks'>
            <section className="subtitleTextStyling">
              <p className='miniTitleText'>Create a Game!</p>
              <div className='underline'></div>
            </section>
            <section className="linkContainer">
              <Link to="/game" className="GLButton">Online kinda</Link>
              <Link to="/1pGame" className="GLButton">Pass and Play</Link>
            </section>
          </section>
          <section className='utilityLinks'>
            <Link to="/ProfilePage" className="ULButton">Profile</Link>
            <Link to="/" onClick={() => { logout() }} className="ULButton">Logout</Link>
          </section>
        </section>
      </section>
    </div >
  );
}
export default LandingPage;
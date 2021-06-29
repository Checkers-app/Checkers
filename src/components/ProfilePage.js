import '../css/Profile-Styling/profile.css';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext.js';
import { Link, useHistory } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

const ProfilePage = () => {

  const [menuState, setMenuState] = useState(false)
  const { user, setUser } = useContext(UserContext);
  let history = useHistory()

  const ratio = 0;
  if (!user.losses === 0) {
    ratio = user.wins / user.losses;
  }
  const [toggleEdit, setToggleEdit] = useState(false)
  const [about, setAbout] = useState('')
  

  useEffect(() => {
    axios.get('/auth/readuser').then(user => {
      console.log(user)
      setUser({
        uid: user.data.uid,
        username: user.data.username,
        wins: user.data.wins,
        losses: user.data.losses,
        about: user.data.about
      })
    })
    
  }, [])


  const edit = () => {
    if (!toggleEdit) {
      setToggleEdit(!toggleEdit)
    }
  }

  const save = () => {
    if (toggleEdit) {
      setToggleEdit(!toggleEdit)
    }
  }

  const logout = () => {
    axios.get('/auth/logout')
      .then(derp => {
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      })
  }

  const expandMenu = () => {
    setMenuState(curr => {
      curr = menuState
      curr = !curr
      return curr
    })
  }



  return (
    <section className='pageFrame' >
      <section className={`leftBox ${menuState ? 'hidden' : 'shown'}`}>
        <button className='menuLines' onClick={() => expandMenu()}>
          <div className='menuLine'>-</div>
          <div className='menuLine'>-</div>
          <div className='menuLine'>-</div>
        </button>
        <section className='homeLink'>
          <Link className='linkSpacing' to='/landingpage' >
            <FaHome className='homeIcon' />
            <p className='homeText'>Home</p>
          </Link>
        </section>
        <Link className='profileLink' to='/profile'>
          <CgProfile className='profileIcon' />
          <p className='profileText'>Profile</p>
        </Link>
      </section>
      <div className="viewContainer">
        <div className='parent-one'>
          <nav className='nav'>
            <div className='placement'>
              <h1 className='username'> {user.username} </h1>
            </div>
            <div className='buttons'>
              <Link to='/editusername'><button className='edit'> Edit Username </button></Link>
              <button className='logout' onClick={logout}> Logout </button>
            </div>
            {/* <h1 className='username'> (Username goes here) </h1>
                    <button className='edit'> Edit Username </button>
                    <button className='logout'> Logout </button> */}
          </nav>
        </div>
        <body className='body'>
          <info className='info'>
            <img className='image' src='https://via.placeholder.com/500' />
            <div className='inside-info'>
              <h1 className='stats'> Stats: </h1>
              <div>
                <h1 className='record'> Wins: {user.wins} </h1>
                <h1 className='record'> Losses: {user.losses} </h1>
                <h1 className='record'> Win/Loss Ratio: {ratio}</h1>
                <h2 className='round'> (Rounded Down) </h2>
              </div>
              <h1 className='about'> About: </h1>
              <p className={`${toggleEdit ? 'display' : 'text'}`}> {user.about} </p>
              <textarea className={`${toggleEdit ? 'show' : 'noShow'} textarea`} defaultValue={user.about} onChange={(e) => setAbout(e.target.value)} />
              <button className={`${toggleEdit ? 'noShow' : 'show'}`} onClick={() => edit()}> Edit </button>
              <button className={`${toggleEdit ? 'show' : 'noShow'}`} onClick={() => save()}> Save </button>
            </div>
          </info>
        </body>
      </div>
    </section>
  )
}

export default ProfilePage
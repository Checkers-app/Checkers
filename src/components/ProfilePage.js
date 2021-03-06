import '../css/Profile-Styling/profile.css';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext.js';
import { Link, useHistory } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';


const ProfilePage = () => {

  const [menuState, setMenuState] = useState(null)
  const { user, setUser } = useContext(UserContext);
  let history = useHistory()

  const ratio = 0;
  if (!user.losses === 0) {
    ratio = user.wins / user.losses;
  }
  const [toggleEdit, setToggleEdit] = useState(false)
  const [about, setAbout] = useState('')


  useEffect(() => {
    if (!user.uid) {
      console.log('no uid')
      console.log(user)
      history.push('/')
    }
  }, [])

  useEffect(() => {
    axios.get('/auth/readuser').then(user => {
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
    console.log('sup my guy')
    setToggleEdit(!toggleEdit);
  }

  const save = () => {
    if (toggleEdit) {
      setToggleEdit(!toggleEdit)
    }
    let uid = user.uid;
    axios.put('/auth/updateuserabout', { about, uid }).then(user => {
      setUser({
        uid: user.data.uid,
        username: user.data.username,
        wins: user.data.wins,
        losses: user.data.losses,
        about: user.data.about
      })
    })
  }

  const logout = () => {
    axios.get('/auth/logout')
      .then(res => {
        setUser(res.data)
        history.push('/')
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

  const checkAnimation = (state) => {
    if (state === null) {
      return ''
    } else if (state === true) {
      return 'hidden'
    } else if (state === false) {
      return 'shown'
    }
  }

  const beginAnimation = () => {
    setMenuState(true)
  }

  return (
    <section className='pageFrame' >
      <section className={`leftBox ${checkAnimation(menuState)}`}>
        <button className='menuLines' onClick={() => {
          beginAnimation()
          expandMenu()
        }}>
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
        <Link to="/" onClick={() => { logout() }} className="logoutButton">
          <IoLogOutOutline className='logoutIcon' />
          <p className='profileText'>Logout</p>
        </Link>
      </section>
      <div className="viewContainer">
        <div className='parent-one'>
          <nav className='nav'>
            <div className='placement'>
              <h1 className='username'> {user.username} </h1>
            </div>
            <div className='buttons'>
              <Link to='/editusername' className='editIconContainer'>
                <AiOutlineEdit className='editIcon' />
              </Link>
            </div>
            {/* <h1 className='username'> (Username goes here) </h1>
                    <button className='edit'> Edit Username </button>
                    <button className='logout'> Logout </button> */}
          </nav>
        </div>
        <body className='body'>
          <section className='info'>
            <section className='imgContainer'>
              <img className='image' src='https://via.placeholder.com/500' />
            </section>
            <div className='inside-info'>
              <section className='justForSpacing'>
                <h1 className='stats'> Stats: </h1>
                <div className='WLContainer'>
                  <h1 className='record'> Wins: {user.wins} </h1>
                  <h1 className='record'> Losses: {user.losses} </h1>
                  <h1 className='record'> Win/Loss Ratio: {ratio}</h1>
                  {/* <h2 className='round'> (Rounded Down) </h2> */}
                </div>
                <h1 className='about'> Description: </h1>
                <p className={`${toggleEdit ? 'display' : 'text'}`}> {user.about} </p>
                <textarea className={`${toggleEdit ? 'show' : 'noShow'} textarea`} defaultValue={user.about} onChange={(e) => setAbout(e.target.value)} />
                <button className='editButton' onClick={toggleEdit ? () => save() : () => edit()}> {`${toggleEdit ? 'Save' : 'Edit'}`} </button>
              </section>
            </div>
          </section>
        </body>
      </div>
    </section>
  )
}

export default ProfilePage
import '../css/Profile-Styling/profile.css'
import { useState } from 'react';

const ProfilePage = () => {
    const wins = 1023;
    const losses = 27;
    const [toggleEdit, setToggleEdit] = useState(false)
    const [input, setInput] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    const [about, setAbout] = useState('')

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

    return (
        <div>
            <div className='parent-one'>
                <nav className='nav'>
                    <div className='placement'>
                        <h1 className='username'> (Username goes here) </h1>
                    </div>
                    <div className='buttons'>
                        <button className='edit'> Edit Username </button>
                        <button className='logout'> Logout </button>
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
                            <h1 className='record'> Wins: {wins} </h1>
                            <h1 className='record'> Losses: {losses} </h1>
                            <h1 className='record'> Win/Loss Ratio: {Math.floor(wins / losses)}</h1>
                            <h2 className='round'> (Rounded Down) </h2>
                        </div>
                        <h1 className='about'> About: </h1>
                        <p className={`${toggleEdit ? 'display' : 'text'}`}> {input} </p>
                        <textarea className={`${toggleEdit ? 'show' : 'noShow'} textarea`} value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className={`${toggleEdit ? 'noShow' : 'show'}`} onClick={() => edit()}> Edit </button>
                        <button className={`${toggleEdit ? 'show' : 'noShow'}`} onClick={() => save()}> Save </button>
                    </div>
                </info>
            </body>
        </div>
    )
}

export default ProfilePage
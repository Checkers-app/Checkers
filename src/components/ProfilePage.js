import '../css/Profile-Styling/profile.css'

const ProfilePage = () => {
    const number = 0;

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
                        <h1 className='record'> Wins: {number} </h1>
                        <h1 className='record'> Losses: {number} </h1>
                        <h1 className='about'> About: </h1>
                        <p className='text'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </info>
            </body>
        </div>
    )
}

export default ProfilePage
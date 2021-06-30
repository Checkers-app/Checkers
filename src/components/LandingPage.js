import { Link, useHistory } from 'react-router-dom';
import '../css/landingpage.css';
import Header from "../components/sharedComps/Header.js";
import { CgProfile } from 'react-icons/cg';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.js';
import axios from 'axios';


function LandingPage(props) {

  const history = useHistory()
  const { user, setUser } = useContext(UserContext);


  useEffect(() => {
    if (!user.uid) {
      console.log('no uid')
      console.log(user)
      history.push('/')
    }
  }, [])

  console.log(user)

  const logout = () => {
    axios.get("/auth/logout")
      .then(res => {
        setUser(res.data)
        history.push('/')
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
              <p className='miniTitleText'>Play a game!</p>
              {/* <div className='underline'></div> */}
            </section>
            <section className="linkContainer">
              <Link to="/game" className="GLButton">Online kinda</Link>
              <Link to="/1pGame" className="GLButton">Pass and Play</Link>
            </section>
          </section>
          <section className='rulesBox'>
            <section className='rulesFrame'>
              <section className='titleContainer'>
                <p className='rulesTitleText'>General Rules</p>
              </section>
              <section className='bodyContainer'>
                <p className='generalRulesText scrollGradient'>
                  The two players alternate turns and can only move their own pieces.
                  <br></br>
                  <br></br>
                  The dark squares are the only ones that may be occupied on the board. The light squares must remain empty.
                  <br></br>
                  <br></br>
                  Each turn involves the moving of one piece, which can consist of a piece moving forward to a diagonally adjacent square that is unoccupied, or jumping forward over an occupied diagonally adjacent square, provided that the square beyond is also empty.
                  <br></br>
                  <br></br>
                  If a player jumps over their opponent’s piece, they have successfully captured that piece and it is removed from the game.
                  <br></br>
                  <br></br>
                  Each piece is initially referred to as a man, but if it reaches the furthest side of the board it becomes a king. When this happens, the player stacks an additional piece on top of the original to signify the change.
                  <br></br>
                  <br></br>
                  Men may only move forward, but kings can move diagonally forwards as well as backwards.
                  Multiple pieces maybe jumped by both men and kings provided that there are successive unoccupied squares beyond each piece that is jumped.
                </p>
              </section>
            </section>
            <section className='aboutFrame'>
              <section className='aboutTitleFrame'>
                <p className='aboutTitle'>About the game</p>
              </section>
              <section className='aboutTextFrame'>
                <p className='aboutText scrollGradient'>Similar games have been played for millennia. A board resembling a checkers (draughts) board was found in Ur dating from 3000 BC. In the British Museum are specimens of ancient Egyptian checkerboards, found with their pieces in burial chambers, and the game was played by Queen Hatasu. Plato mentioned a game, πεττεία or petteia, as being of Egyptian origin, and Homer also mentions it. The method of capture was placing two pieces on either side of the opponent's piece. It was said to have been played during the Trojan War. The Romans played a derivation of petteia called latrunculi, or the game of the Little Soldiers. The pieces, and sporadically the game itself, were called calculi (pebbles).
                  <br></br>
                  <br></br>
                  An Arabic game called Quirkat or al-qirq, with similar play to modern checkers (draughts), was played on a 5×5 board. It is mentioned in the 10th-century work Kitab al-Aghani.Al qirq was also the name for the game that is now called nine men's morris. Al qirq was brought to Spain by the Moors, where it became known as Alquerque, the Spanish derivation of the Arabic name. The rules are given in the 13th-century book Libro de los juegos. In about 1100, probably in the south of France, the game of Alquerque was adapted using backgammon pieces on a chessboard. Each piece was called a "fers", the same name as the chess queen, as the move of the two pieces was the same at the time.
                  <br></br>
                  <br></br>
                  The rule of crowning was used by the 13th century, as it is mentioned in the Philip Mouskat's Chronique in 1243 when the game was known as Fierges, the name used for the chess queen (derived from the Persian ferz, meaning royal counsellor or vizier). The pieces became known as "dames" when that name was also adopted for the chess queen. The rule forcing players to take whenever possible was introduced in France in around 1535, at which point the game became known as Jeu forcé, identical to modern English draughts. The game without forced capture became known as Le jeu plaisant de dames, the precursor of international draughts.
                </p>
              </section>
            </section>
          </section>
          <section className='utilityLinks'>
            <Link to="/profile" className="ULButton">Profile</Link>
            <Link to="/" onClick={() => { logout() }} className="ULButton">Logout</Link>
          </section>
        </section>
      </section>
    </div >
  );
}
export default LandingPage;
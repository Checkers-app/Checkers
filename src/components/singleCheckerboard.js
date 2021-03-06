import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import '../css/checkerboard.css';
import { toast } from "react-toastify";
import Movehistory from './Movehistory'
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { BiCrown } from 'react-icons/bi'
import { IoLogOutOutline } from 'react-icons/io5';
import { UserContext } from '../context/UserContext.js';
import axios from 'axios';

const SingleCheckerboard = () => {
  const [valid, setValid] = useState({
    name: 'valid'
  })
  const [invalid, setInvalid] = useState({
    name: 'invalid'
  })
  const start = [
    [[invalid], [{ color: 'black', isKing: false, id: 1 }], [invalid], [{ color: 'black', isKing: false, id: 2 }], [invalid], [{ color: 'black', isKing: false, id: 3 }], [invalid], [{ color: 'black', isKing: false, id: 4 }]],
    [[{ color: 'black', isKing: false, id: 5 }], [invalid], [{ color: 'black', isKing: false, id: 6 }], [invalid], [{ color: 'black', isKing: false, id: 7 }], [invalid], [{ color: 'black', isKing: false, id: 8 }], [invalid]],
    [[invalid], [{ color: 'black', isKing: false, id: 9 }], [invalid], [{ color: 'black', isKing: false, id: 10 }], [invalid], [{ color: 'black', isKing: false, id: 11 }], [invalid], [{ color: 'black', isKing: false, id: 12 }]],
    [[valid], [invalid], [valid], [invalid], [valid], [invalid], [valid], [invalid]],
    [[invalid], [valid], [invalid], [valid], [invalid], [valid], [invalid], [valid]],
    [[{ color: 'red', isKing: false, id: 13 }], [invalid], [{ color: 'red', isKing: false, id: 14 }], [invalid], [{ color: 'red', isKing: false, id: 15 }], [invalid], [{ color: 'red', isKing: false, id: 16 }], [invalid]],
    [[invalid], [{ color: 'red', isKing: false, id: 17 }], [invalid], [{ color: 'red', isKing: false, id: 18 }], [invalid], [{ color: 'red', isKing: false, id: 19 }], [invalid], [{ color: 'red', isKing: false, id: 20 }]],
    [[{ color: 'red', isKing: false, id: 21 }], [invalid], [{ color: 'red', isKing: false, id: 22 }], [invalid], [{ color: 'red', isKing: false, id: 23 }], [invalid], [{ color: 'red', isKing: false, id: 24 }], [invalid]]
  ]

  const [oneScore, setOneScore] = useState(12)
  const [redWins, setRedWins] = useState(0)
  const [blackWins, setBlackWins] = useState(0)
  const [twoScore, setTwoScore] = useState(12)
  const [turnState, setTurnState] = useState(true)
  const [pieceSelected, setPieceSelected] = useState(false)
  const [pieceIndex, setPieceIndex] = useState(null)
  const [jumpId, setJumpId] = useState(false)
  const [checkerboard, setCheckerboard] = useState(start)
  const [menuState, setMenuState] = useState(null)
  //Socket States
  const [moves, setMoves] = useState([])
  const { user, setUser } = useContext(UserContext)
  const history = useHistory()

  let piece;
  let pieceToJump;
  let moveLeft;
  let moveRight;
  let jumpLeft;
  let jumpRight;
  let moveLeftDown;
  let moveLeftUp;
  let moveRightDown;
  let moveRightUp;
  let jumpLeftDown;
  let jumpLeftUp;
  let jumpRightDown;
  let jumpRightUp;

  useEffect(() => {
    if (!user.uid) {
      console.log('no uid')
      console.log(user)
      history.push('/')
    }
  }, [])

  useEffect(() => {
    if (oneScore === 0) {
      toast.dark('Black has won the game!')
      setOneScore(12)
      setTwoScore(12)
      setTurnState(true)
      setBlackWins((curr) => {
        curr += 1
        return curr
      })
      setCheckerboard(start)
      setMoves([])
    } else if (twoScore === 0) {
      toast.error('Red has won the game!')
      setTwoScore(12)
      setOneScore(12)
      setTurnState(true)
      setRedWins((curr) => {
        curr += 1
        return curr
      })
      setCheckerboard(start)
      setMoves([])
    }
  }, [checkerboard])

  const selectionHandler = (row, col, piece) => {
    if (jumpId) {
      if (jumpId === piece.id) {
        setPieceSelected(piece)
        setPieceIndex([row, col])
      } else {
        toast.warning('Must take the double jump!')
      }
    } else {
      setPieceSelected(piece)
      setPieceIndex([row, col])
    }
  }

  const availableMoves = (curr) => {
    pieceToJump = (turnState ? "black" : "red")
    piece = pieceSelected
    if (piece.isKing === true) {
      moveLeftDown = [curr[0] + 1, curr[1] - 1]
      jumpLeftDown = [curr[0] + 2, curr[1] - 2]
      moveRightDown = [curr[0] + 1, curr[1] + 1]
      jumpRightDown = [curr[0] + 2, curr[1] + 2]
      moveLeftUp = [curr[0] - 1, curr[1] - 1]
      jumpLeftUp = [curr[0] - 2, curr[1] - 2]
      moveRightUp = [curr[0] - 1, curr[1] + 1]
      jumpRightUp = [curr[0] - 2, curr[1] + 2]
    } else {
      if (!turnState) {
        moveLeft = [curr[0] + 1, curr[1] - 1]
        jumpLeft = [curr[0] + 2, curr[1] - 2]
        moveRight = [curr[0] + 1, curr[1] + 1]
        jumpRight = [curr[0] + 2, curr[1] + 2]
      } else {
        moveLeft = [curr[0] - 1, curr[1] - 1]
        jumpLeft = [curr[0] - 2, curr[1] - 2]
        moveRight = [curr[0] - 1, curr[1] + 1]
        jumpRight = [curr[0] - 2, curr[1] + 2]
      }
    }
  }


  const checkIsValidJump = (boardState, jumpDirection) => {
    switch (JSON.stringify(jumpDirection)) {
      //----Normal Jump Checks----
      case JSON.stringify(jumpRight):
        switch (true) {
          case boardState[jumpRight[0]][jumpRight[1]][0] === valid && boardState[moveRight[0]][moveRight[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpLeft):
        switch (true) {
          case boardState[jumpLeft[0]][jumpLeft[1]][0] === valid && boardState[moveLeft[0]][moveLeft[1]][0].color === pieceToJump:
            return true
        }
        break;
      //----King Jump Checks----
      case JSON.stringify(jumpLeftUp):
        switch (true) {
          case boardState[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && boardState[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpRightUp):
        switch (true) {
          case boardState[jumpRightUp[0]][jumpRightUp[1]][0] === valid && boardState[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpRightDown):
        switch (true) {
          case boardState[jumpRightDown[0]][jumpRightDown[1]][0] === valid && boardState[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpLeftDown):
        switch (true) {
          case boardState[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && boardState[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump:
            return true
        }
        break;
    }
  }

  const move = (row, col, piece) => {
    let newIndex = [row, col]
    if (jumpId !== piece.id) {
      setCheckerboard((curr) => {
        curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
        curr[row].splice(col, 1, [piece])
        return curr
      })
      endTurn(newIndex);
    }
  }

  const jump = (row, col, piece, placeToJump) => {
    let newIndexRow = row
    let newIndexCol = col
    let newIndex = [newIndexRow, newIndexCol]
    const landingSpot = JSON.stringify(newIndex)
    //----Corner spots
    const topLeftCornerUp = JSON.stringify([0, 1])
    const topLeftCornerDown = JSON.stringify([1, 0])
    const topRightCornerUp = JSON.stringify([0, 7])
    const topRightCornerDown = JSON.stringify([1, 6])
    const bottomRightCornerUp = JSON.stringify([6, 7])
    const bottomRightCornerDown = JSON.stringify([7, 6])
    const bottomLeftCornerUp = JSON.stringify([6, 1])
    const bottomLeftCornerDown = JSON.stringify([7, 0])

    //----MAKE JUMP----
    let currCheck = [...checkerboard];
    currCheck[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
    currCheck[placeToJump[0]].splice(placeToJump[1], 1, [valid])
    currCheck[row].splice(col, 1, [piece])
    setCheckerboard(currCheck);
    //----Set Score----
    if (turnState) {
      setTwoScore(score => {
        score = twoScore
        score -= 1
        return score
      })
    } else {
      setOneScore(score => {
        score = oneScore
        score -= 1
        return score
      })
    }
    //----Reset Piece Position----
    setPieceSelected(piece)
    setPieceIndex(newIndex)
    availableMoves(newIndex)
    //----CHECK DOUBLEJUMPS----
    //----King Checks----
    if (piece.isKing) {
      // CORNER LOGIC
      if (((landingSpot === topLeftCornerUp) || (landingSpot === topLeftCornerDown))) {
        // console.log('TLC: ending turn') --------- FOR DEBUGGING
        setJumpId(false)
        endTurn(newIndex)
      } else if (((landingSpot === topRightCornerUp) || (landingSpot === topRightCornerDown))) {
        // console.log('TRC: ending turn') --------- FOR DEBUGGING
        setJumpId(false)
        endTurn(newIndex)
      } else if (((landingSpot === bottomRightCornerUp) || (landingSpot === bottomRightCornerDown))) {
        // console.log('BRC: ending turn') --------- FOR DEBUGGING
        setJumpId(false)
        endTurn(newIndex)
      } else if (((landingSpot === bottomLeftCornerUp) || (landingSpot === bottomLeftCornerDown))) {
        // console.log('BLC: ending turn') --------- FOR DEBUGGING
        setJumpId(false)
        endTurn(newIndex)
      }
      else {
        //----King LeftEdge DoubleJumps----
        if ((newIndexCol === 0 || newIndexCol === 1)
          &&
          ((checkIsValidJump(currCheck, jumpRightUp)) || (checkIsValidJump(currCheck, jumpRightDown)))) {
          // console.log('KingLeftEdge DJ: we did it') --------- FOR DEBUGGING
          setJumpId(piece.id)
          //----King RightEdge DoubleJumps----
        } else if ((newIndexCol === 6 || newIndexCol === 7)
          &&
          ((checkIsValidJump(currCheck, jumpLeftUp)) || (checkIsValidJump(currCheck, jumpLeftDown)))) {
          // console.log('KingRightEdge DJ: we did it') --------- FOR DEBUGGING
          setJumpId(piece.id)
          //----King TopEdge DoubleJumps----
        } else if ((newIndexRow === 0 || newIndexRow === 1)
          &&
          ((checkIsValidJump(currCheck, jumpRightDown)) || (checkIsValidJump(currCheck, jumpLeftDown)))) {
          // console.log('KingTopEdge DJ: we did it') --------- FOR DEBUGGING
          setJumpId(piece.id)
          //----King BottomEdge Jumps----
        } else if ((newIndexRow === 6 || newIndexRow === 7)
          &&
          ((checkIsValidJump(currCheck, jumpRightUp)) || (checkIsValidJump(currCheck, jumpLeftUp)))) {
          // console.log('KingBottomEdge DJ: we did it') --------- FOR DEBUGGING
          setJumpId(piece.id)
          //----King Inside Jumps----
        } else if (
          (
            !(newIndexRow === 6
              || newIndexRow === 7
              || newIndexRow === 0
              || newIndexRow === 1
              || newIndexCol === 0
              || newIndexCol === 1
              || newIndexCol === 6
              || newIndexCol === 7)
          )
        ) {
          if ((checkIsValidJump(currCheck, jumpRightUp))
            || (checkIsValidJump(currCheck, jumpRightDown))
            || (checkIsValidJump(currCheck, jumpLeftUp))
            || (checkIsValidJump(currCheck, jumpLeftDown))) {
            // console.log('kingInsideDJ: we did it') --------- FOR DEBUGGING
            setJumpId(piece.id)
          } else {
            // console.log('kingNoInsideDJ: ending turn') --------- FOR DEBUGGING
            setJumpId(false)
            endTurn(newIndex)
          }
        } else {
          // console.log('kingNoEdgeDJ: ending turn') --------- FOR DEBUGGING
          setJumpId(false)
          endTurn(newIndex)
        }
      }
      //----Normal Checks----
    } else {
      //----Normal Piece landed on opposite last two rows(no jumps possible)----
      if ((
        ((newIndexRow === 0) || (newIndexRow === 1))
        ||
        ((newIndexRow === 7) || (newIndexRow === 6))
      )) {
        // console.log('normPiece endOfLine: ending turn') --------- FOR DEBUGGING
        setJumpId(false);
        endTurn(newIndex);
        //----Left/Right Edge Checks----
      } else if (
        ((newIndexCol === 0) || (newIndexCol === 1)) && !(checkIsValidJump(currCheck, jumpRight))
        ||
        ((newIndexCol === 7) || (newIndexCol === 6)) && !(checkIsValidJump(currCheck, jumpLeft))
      ) {
        // console.log('normLREdgeNoDJ: ending turn') --------- FOR DEBUGGING
        setJumpId(false);
        endTurn(newIndex);
      } else {
        if ((newIndexCol === 0) || (newIndexCol === 1)) {
          if (checkIsValidJump(currCheck, jumpRight)) {
            // console.log('normLeftEdgeDJ: we did it') --------- FOR DEBUGGING
            setJumpId(piece.id)
          }
        } else if ((newIndexCol === 6) || (newIndexCol === 7)) {
          if (checkIsValidJump(currCheck, jumpLeft)) {
            // console.log('normRightEdgeDJ: we did it') --------- FOR DEBUGGING
            setJumpId(piece.id)
          }
        } else if ((checkIsValidJump(currCheck, jumpRight)) || (checkIsValidJump(currCheck, jumpLeft))) {
          // console.log('normInsideDJ: we did it') --------- FOR DEBUGGING
          setJumpId(piece.id)
        } else {
          // console.log('noDJ: ending turn') --------- FOR DEBUGGING
          setJumpId(false);
          endTurn(newIndex);
        }
      }
    }
  }

  const moveHistory = (piece, endSpot) => {
    // const newMove = `${piece.color} moved ${piece.id} to ${endSpot[1] + 1}, ${7 - endSpot[0] + 1}`
    const newMove = {
      id: piece.id,
      color: piece.color,
      landing: endSpot
    }
    setMoves((oldMoves) => {
      const moves = [...oldMoves, { newMove }]
      return moves
    })
  }

  const endTurn = (newIndex) => {
    if ((piece.isKing === false) && (newIndex[0] === (turnState ? 0 : 7))) {
      piece.isKing = true;
      // console.log(`${piece.id} is now Kinged`) --------- FOR DEBUGGING
    }
    setTurnState(!turnState);
    setPieceSelected(false);
    setJumpId(false);
    moveHistory(piece, newIndex)
  }

  const concede = () => {
    if (turnState) {
      setOneScore(0)
      setCheckerboard(start)
      setTurnState(true)
      setMoves([])
    } else {
      setTwoScore(0)
      setCheckerboard(start)
      setTurnState(true)
      setMoves([])
    }
  }


  const movePiece = (row, col) => {
    availableMoves(pieceIndex);
    let intendedMove = JSON.stringify([row, col])
    if (piece.isKing === true) {
      //----King Move Scenarios
      if (intendedMove === JSON.stringify(moveLeftDown)
        || intendedMove === JSON.stringify(moveRightDown)
        || intendedMove === JSON.stringify(moveRightUp)
        || intendedMove === JSON.stringify(moveLeftUp)
      ) {
        move(row, col, piece);
        //----King Jump Scenarios
      } else if (
        (intendedMove === JSON.stringify(jumpLeftDown) && checkerboard[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump)
        || (intendedMove === JSON.stringify(jumpRightDown) && checkerboard[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)
        || (intendedMove === JSON.stringify(jumpLeftUp) && checkerboard[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump)
        || (intendedMove === JSON.stringify(jumpRightUp) && checkerboard[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
      ) {
        if (intendedMove === JSON.stringify(jumpLeftUp)) {
          jump(row, col, piece, moveLeftUp)
        } else if (intendedMove === JSON.stringify(jumpLeftDown)) {
          jump(row, col, piece, moveLeftDown)
        } else if (intendedMove === JSON.stringify(jumpRightUp)) {
          jump(row, col, piece, moveRightUp)
        } else if (intendedMove === JSON.stringify(jumpRightDown)) {
          jump(row, col, piece, moveRightDown)
        }
      }
    } else {
      //----Normal Move Scenarios
      if (intendedMove === JSON.stringify(moveLeft) || intendedMove === JSON.stringify(moveRight)) {
        move(row, col, piece);
        //----Normal Jump Scenarios
      } else if (
        (intendedMove === JSON.stringify(jumpLeft) && checkerboard[moveLeft[0]][moveLeft[1]][0].color === pieceToJump)
        ||
        (intendedMove === JSON.stringify(jumpRight) && checkerboard[moveRight[0]][moveRight[1]][0].color === pieceToJump)
      ) {
        if (intendedMove === JSON.stringify(jumpLeft)) {
          jump(row, col, piece, moveLeft)
        } else {
          jump(row, col, piece, moveRight)
        }
      } else {
        toast.error('Illegal move')
      }
    }
  }

  const expandMenu = () => {
    setMenuState(curr => {
      curr = menuState
      curr = !curr
      return curr
    })
  }

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
    <section className='checkerboardFrame'>
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
      <section className='gameAndLeftBox'>
        <div className='spacing'>
          {checkerboard.map((row, index) => {
            return (
              <div key={index} className="row">
                {row.map((cell, i) => {
                  if (cell[0]?.color === 'red') {
                    return (
                      <div key={i} className="checker-boxes">
                        <div
                          onClick={
                            turnState
                              ? () => selectionHandler(index, i, cell[0])
                              : null
                          }
                          className={
                            pieceSelected.id === cell[0].id
                              ? "red-piece selection"
                              : "red-piece"
                          }>
                          {
                            cell[0].isKing
                              ? <BiCrown className='king' />
                              : cell[0].id
                          }
                        </div>
                      </div>
                    )
                  } else if (cell[0]?.color === 'black') {
                    return (
                      <div key={i} className="checker-boxes">
                        <div
                          onClick={
                            turnState
                              ? null
                              : () => selectionHandler(index, i, cell[0])
                          }
                          className={
                            pieceSelected.id === cell[0].id
                              ? "black-piece selection"
                              : "black-piece"
                          }>
                          {
                            cell[0].isKing
                              ? <BiCrown className='king' />
                              : cell[0].id
                          }
                        </div>
                      </div>
                    )
                  } else if (cell[0]?.name === 'valid') {
                    return (
                      <div onClick={pieceSelected ? () => movePiece(index, i) : null} key={i} className="checker-boxes"></div>
                    )
                  } else {
                    return (
                      <div key={i} className="checker-boxes checker-boxes-group-2"></div>
                    )
                  }
                })}
              </div>
            )
          })}
          <div className='bottomLine'></div>
        </div>
      </section>
      <section className='sideFrame'>
        <section className='turnStateBox'>
          <section className='turnStateDisplay'>
            <h1 className={turnState ? "activeTurnText" : "inactiveTurnText"}>Red's Turn</h1>
            <p className='divider'>|</p>
            <h1 className={turnState ? "inactiveTurnText" : "activeTurnText"}>Black's Turn</h1>
          </section>
          <section className='moveBox'>
            <div>
              <h1 className='turn-history'> Turn History: </h1>
            </div>
            <section className='everythingButScore scrollGradient'>
              <Movehistory moves={moves} />
            </section>
            <section className='scoreBox'>
              <h1 className='scoreDisplay'> Red Score: {oneScore} </h1>
              <h1 className='scoreDisplay'> Black Score: {twoScore} </h1>
            </section>
          </section>
          <section className='middleButtonContainer'>
            <button className='concedeButton' onClick={() => concede()}> Concede </button>
            <Link className='leaveButton' to='/landingpage'>Leave Match</Link>
          </section>
        </section>
        <section className='localWins'>
          <div>
            <div className='red-wins'>
              <h1> RED WINS: </h1>
              <h1> {redWins} </h1>
            </div>
            <div className='black-wins'>
              <h1> BLACK WINS: </h1>
              <h1> {blackWins} </h1>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default SingleCheckerboard;

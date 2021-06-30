import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../css/checkerboard.css';
import { toast } from "react-toastify";
import io from "socket.io-client";
import ChatBox from './Chatbox';
import MoveHistory from './Movehistory';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline } from 'react-icons/io5';
import axios from 'axios';


const Checkerboard = () => {
  const [valid] = useState({
    name: 'valid'
  })
  const [invalid] = useState({
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
  // checkerboard[index][i]
  const [oneScore, setOneScore] = useState(12)
  const [redWins, setRedWins] = useState(0)
  const [blackWins, setBlackWins] = useState(0)
  const [twoScore, setTwoScore] = useState(12)
  const [turnState, setTurnState] = useState(true)
  const [piece, setPiece] = useState(false)
  const [pieceIndex, setPieceIndex] = useState(null)
  const [jumpId, setJumpId] = useState(false)
  const [checkerboard, setCheckerboard] = useState(start)
  // menu and animation state
  const [menuState, setMenuState] = useState(null)
  //Socket States
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [moves, setMoves] = useState([])
  const [socketId, setSocketId] = useState(null)

  let pieceToJump;
  let moveLeft = useRef(null);
  let moveRight = useRef(null);
  let jumpLeft = useRef(null);
  let jumpRight = useRef(null);
  let moveLeftDown = useRef(null);
  let moveLeftUp = useRef(null);
  let moveRightDown = useRef(null);
  let moveRightUp = useRef(null);
  let jumpLeftDown = useRef(null);
  let jumpLeftUp = useRef(null);
  let jumpRightDown = useRef(null);
  let jumpRightUp = useRef(null);

  useEffect(() => {
    if (!socket) {
      setSocket(io.connect())
    }
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on('relaySocketId', socketId => {
        setSocketId(socketId)
      })

      socket.on('receiveMsgs', (message) => {
        setMessages(oldMsgs => {
          const newMsgs = [...oldMsgs, message]
          return newMsgs
        })
      })
      socket.on('receiveMoveHistory', (moveHistory) => {
        const { piece, endSpot } = moveHistory
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
      })
      socket.on('receiveBoardState', (checkerboard) => {
        setCheckerboard(checkerboard)
      })
      socket.on('receiveTurnState', turnState => {
        setTurnState(turnState)
      })
      socket.on('receiveResetMoves', (moves) => {
        setMoves(moves)
      })
      socket.on('receiveGameState', (gameObj) => {
        console.log(gameObj.checkerboardState)
        setCheckerboard(gameObj.checkerboardState);
        setOneScore(gameObj.scoreOne);
        setTwoScore(gameObj.scoreTwo);
        setTurnState(gameObj.turnState);

        if (gameObj.scoreTwo === 0) {
          sendWinMessage('red')
        } else if (gameObj.scoreOne === 0) {
          sendWinMessage('black')
        }
      })

      socket.on('receiveConcede', str => {
        if (str === 'red') {
          sendWinMessage('red')
        } else if (str === 'black') {
          sendWinMessage('black')
        }
      })
    }
  }, [socket])

  const sendGameState = (gameObj) => {
    socket.emit('sendGameState', gameObj)
  }

  const sendOneScore = (oneDisplay) => {
    socket.emit('sendOneScore', oneDisplay)
  }

  const sendTwoScore = (twoDisplay) => {
    socket.emit('sendTwoScore', twoDisplay)
  }

  const handleMessages = (newMsg) => {
    const messageObj = {
      message: newMsg.message,
      username: newMsg.username,
      socketId: socketId
    }
    socket.emit('sendMsgs', messageObj)
  }

  const handleMoves = (piece, endSpot) => {
    socket.emit('sendMoveHistory', { piece, endSpot })
  }

  const resetMoves = (moves) => {
    socket.emit('sendResetMoves', moves)
  }



  const sendWinMessage = (whoWon) => {
    if (whoWon === 'red') {
      toast.error('Player 1 has won the game!')
    } else {
      toast.dark('Player 2 has won the game!')
    }
  }

  useEffect(() => {
    if (oneScore === 0) {
      setOneScore(12)
      setTwoScore(12)
      setTurnState(true)
      sendBoardState(start)
      setBlackWins((curr) => {
        curr += 1
        return curr
      })
      resetMoves([])
    } else if (twoScore === 0) {
      setTwoScore(12)
      setOneScore(12)
      setTurnState(true)
      sendBoardState(start)
      setRedWins((curr) => {
        curr += 1
        return curr
      })
      resetMoves([])
    }

  }, [checkerboard])

  const selectionHandler = (row, col, piece) => {
    if (jumpId) {
      if (jumpId === piece.id) {
        setPiece(piece)
        setPieceIndex([row, col])
      } else {
        console.log("must double jump");
      }
    } else {
      setPiece(piece)
      setPieceIndex([row, col])
    }
  }

  const availableMoves = (curr) => {
    pieceToJump = (turnState ? "black" : "red")
    if (piece.isKing === true) {
      moveLeftDown.current = [curr[0] + 1, curr[1] - 1]
      jumpLeftDown.current = [curr[0] + 2, curr[1] - 2]
      moveRightDown.current = [curr[0] + 1, curr[1] + 1]
      jumpRightDown.current = [curr[0] + 2, curr[1] + 2]
      moveLeftUp.current = [curr[0] - 1, curr[1] - 1]
      jumpLeftUp.current = [curr[0] - 2, curr[1] - 2]
      moveRightUp.current = [curr[0] - 1, curr[1] + 1]
      jumpRightUp.current = [curr[0] - 2, curr[1] + 2]
    } else {
      if (!turnState) {
        moveLeft.current = [curr[0] + 1, curr[1] - 1]
        jumpLeft.current = [curr[0] + 2, curr[1] - 2]
        moveRight.current = [curr[0] + 1, curr[1] + 1]
        jumpRight.current = [curr[0] + 2, curr[1] + 2]
      } else {
        moveLeft.current = [curr[0] - 1, curr[1] - 1]
        jumpLeft.current = [curr[0] - 2, curr[1] - 2]
        moveRight.current = [curr[0] - 1, curr[1] + 1]
        jumpRight.current = [curr[0] - 2, curr[1] + 2]
      }
    }
  }

  const checkIsValidJump = (boardState, jumpDirection) => {
    switch (JSON.stringify(jumpDirection)) {
      //----Normal Jump Checks----
      case JSON.stringify(jumpRight.current):
        console.log(boardState[jumpRight.current[0]][jumpRight.current[1]][0])
        console.log(boardState[moveRight.current[0]][moveRight.current[1]][0].color)
        console.log(pieceToJump)
        switch (true) {
          case boardState[jumpRight.current[0]][jumpRight.current[1]][0].name === 'valid' && boardState[moveRight.current[0]][moveRight.current[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpLeft.current):
        switch (true) {
          case boardState[jumpLeft.current[0]][jumpLeft.current[1]][0].name === 'valid' && boardState[moveLeft.current[0]][moveLeft.current[1]][0].color === pieceToJump:
            return true
        }
        break;
      //----King Jump Checks----
      case JSON.stringify(jumpLeftUp.current):
        switch (true) {
          case boardState[jumpLeftUp.current[0]][jumpLeftUp.current[1]][0].name === 'valid' && boardState[moveLeftUp.current[0]][moveLeftUp.current[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpRightUp.current):
        switch (true) {
          case boardState[jumpRightUp.current[0]][jumpRightUp.current[1]][0].name === 'valid' && boardState[moveRightUp.current[0]][moveRightUp.current[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpRightDown.current):
        switch (true) {
          case boardState[jumpRightDown.current[0]][jumpRightDown.current[1]][0].name === 'valid' && boardState[moveRightDown.current[0]][moveRightDown.current[1]][0].color === pieceToJump:
            return true
        }
        break;
      case JSON.stringify(jumpLeftDown.current):
        switch (true) {
          case boardState[jumpLeftDown.current[0]][jumpLeftDown.current[1]][0].name === 'valid' && boardState[moveLeftDown.current[0]][moveLeftDown.current[1]][0].color === pieceToJump:
            return true
        }
        break;
    }
  }

  const move = (row, col, piece) => {
    let newIndex = [row, col]
    if (jumpId !== piece.id) {
      let newCheckerboard = [...checkerboard];
      newCheckerboard[pieceIndex[0]].splice(pieceIndex[1], 1, [valid]);
      newCheckerboard[row].splice(col, 1, [piece]);

      setCheckerboard((curr) => {
        curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
        curr[row].splice(col, 1, [piece])
        return curr
      })
      endTurn(newIndex, newCheckerboard, oneScore, twoScore);
    }
  }

  const sendBoardState = (checkerboard) => {
    socket.emit('sendBoardState', checkerboard)
  }

  const jump = (row, col, piece, placeToJump) => {
    let newOneScore = oneScore;
    let newTwoScore = twoScore;
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
      newTwoScore -= 1
      setTwoScore(newTwoScore)
    } else {
      newOneScore -= 1
      setOneScore(newOneScore)
    }
    //----Reset Piece Position----
    setPiece(piece)
    setPieceIndex(newIndex)
    availableMoves(newIndex)
    //----CHECK DOUBLEJUMPS----
    //----King Checks----
    if (piece.isKing) {
      // CORNER LOGIC
      if (((landingSpot === topLeftCornerUp) || (landingSpot === topLeftCornerDown))) {
        console.log('TLC: ending turn')
        setJumpId(false)
        endTurn(newIndex, currCheck, newOneScore, newTwoScore)
      } else if (((landingSpot === topRightCornerUp) || (landingSpot === topRightCornerDown))) {
        console.log('TRC: ending turn')
        setJumpId(false)
        endTurn(newIndex, currCheck, newOneScore, newTwoScore)
      } else if (((landingSpot === bottomRightCornerUp) || (landingSpot === bottomRightCornerDown))) {
        console.log('BRC: ending turn')
        setJumpId(false)
        endTurn(newIndex, currCheck, newOneScore, newTwoScore)
      } else if (((landingSpot === bottomLeftCornerUp) || (landingSpot === bottomLeftCornerDown))) {
        console.log('BLC: ending turn')
        setJumpId(false)
        endTurn(newIndex, currCheck, newOneScore, newTwoScore)
      }
      else {
        //----King LeftEdge DoubleJumps----
        if ((newIndexCol === 0 || newIndexCol === 1)
          &&
          ((checkIsValidJump(currCheck, jumpRightUp.current)) || (checkIsValidJump(currCheck, jumpRightDown.current)))) {
          console.log('KingLeftEdge DJ: we did it')
          setJumpId(piece.id)
          //----King RightEdge DoubleJumps----
        } else if ((newIndexCol === 6 || newIndexCol === 7)
          &&
          ((checkIsValidJump(currCheck, jumpLeftUp.current)) || (checkIsValidJump(currCheck, jumpLeftDown.current)))) {
          console.log('KingRightEdge DJ: we did it')
          setJumpId(piece.id)
          //----King TopEdge DoubleJumps----
        } else if ((newIndexRow === 0 || newIndexRow === 1)
          &&
          ((checkIsValidJump(currCheck, jumpRightDown.current)) || (checkIsValidJump(currCheck, jumpLeftDown.current)))) {
          console.log('KingTopEdge DJ: we did it')
          setJumpId(piece.id)
          //----King BottomEdge Jumps----
        } else if ((newIndexRow === 6 || newIndexRow === 7)
          &&
          ((checkIsValidJump(currCheck, jumpRightUp.current)) || (checkIsValidJump(currCheck, jumpLeftUp.current)))) {
          console.log('KingBottomEdge DJ: we did it')
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
          if ((checkIsValidJump(currCheck, jumpRightUp.current))
            || (checkIsValidJump(currCheck, jumpRightDown.current))
            || (checkIsValidJump(currCheck, jumpLeftUp.current))
            || (checkIsValidJump(currCheck, jumpLeftDown.current))) {
            console.log('kingInsideDJ: we did it')
            setJumpId(piece.id)
          } else {
            console.log('kingNoInsideDJ: ending turn')
            setJumpId(false)
            endTurn(newIndex, currCheck, newOneScore, newTwoScore)
          }
        } else {
          console.log('kingNoEdgeDJ: ending turn')
          setJumpId(false)
          endTurn(newIndex, currCheck, newOneScore, newTwoScore)
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
        console.log('normPiece endOfLine: ending turn')
        setJumpId(false);
        endTurn(newIndex, currCheck, newOneScore, newTwoScore)
        //----Left/Right Edge Checks----
      } else if (
        ((newIndexCol === 0) || (newIndexCol === 1)) && !(checkIsValidJump(currCheck, jumpRight.current))
        ||
        ((newIndexCol === 7) || (newIndexCol === 6)) && !(checkIsValidJump(currCheck, jumpLeft.current))
      ) {
        console.log('normLREdgeNoDJ: ending turn')
        setJumpId(false);
        endTurn(newIndex, currCheck, newOneScore, newTwoScore)
      } else {
        console.log(currCheck)
        console.log('JR:', jumpRight.current)
        if ((newIndexCol === 0) || (newIndexCol === 1)) {
          if (checkIsValidJump(currCheck, jumpRight.current)) {
            console.log('normLeftEdgeDJ: we did it')
            setJumpId(piece.id)
          }
        } else if ((newIndexCol === 6) || (newIndexCol === 7)) {
          if (checkIsValidJump(currCheck, jumpLeft.current)) {
            console.log('normRightEdgeDJ: we did it')
            setJumpId(piece.id)
          }
        } else if ((checkIsValidJump(currCheck, jumpRight.current)) || (checkIsValidJump(currCheck, jumpLeft.current))) {
          console.log('normInsideDJ: we did it')
          setJumpId(piece.id)
        } else {
          console.log('noDJ: ending turn')
          setJumpId(false);
          endTurn(newIndex, currCheck, newOneScore, newTwoScore)
        }
      }
    }
  }


  const sendTurn = (turnState) => {
    socket.emit('sendTurnState', turnState)
  }

  const endTurn = (newIndex, newCheckerboard, newOneScore, newTwoScore) => {
    if ((piece.isKing === false) && (newIndex[0] === (turnState ? 0 : 7))) {
      piece.isKing = true;
      console.log(`${piece.id} is now Kinged`)
    }
    setTurnState(!turnState);
    setPiece(false);
    setJumpId(false);
    handleMoves(piece, newIndex)
    sendGameState({ checkerboardState: newCheckerboard, turnState: !turnState, scoreOne: newOneScore, scoreTwo: newTwoScore, })
  }

  const concede = () => {
    if (turnState) {
      setOneScore(0)
      sendOneScore(0)
      sendTwoScore(0)
      setJumpId(false)
      setCheckerboard(start)
      setTurnState(true)
      sendTurn(true)
      sendBoardState(start)
      setMoves([])
      socket.emit('concede', 'black')
    } else {
      setTwoScore(0)
      sendOneScore(0)
      sendTwoScore(0)
      setJumpId(false)
      setCheckerboard(start)
      setTurnState(true)
      sendTurn(true)
      sendBoardState(start)
      setMoves([])
      socket.emit('concede', 'red')
    }
  }


  const movePiece = (row, col) => {
    availableMoves(pieceIndex);
    let intendedMove = JSON.stringify([row, col])
    if (piece.isKing === true) {
      //----King Move Scenarios
      if (intendedMove === JSON.stringify(moveLeftDown.current)
        || intendedMove === JSON.stringify(moveRightDown.current)
        || intendedMove === JSON.stringify(moveRightUp.current)
        || intendedMove === JSON.stringify(moveLeftUp.current)
      ) {
        move(row, col, piece);
        //----King Jump Scenarios
      } else if (
        (intendedMove === JSON.stringify(jumpLeftDown.current) && checkerboard[moveLeftDown.current[0]][moveLeftDown.current[1]][0].color === pieceToJump)
        || (intendedMove === JSON.stringify(jumpRightDown.current) && checkerboard[moveRightDown.current[0]][moveRightDown.current[1]][0].color === pieceToJump)
        || (intendedMove === JSON.stringify(jumpLeftUp.current) && checkerboard[moveLeftUp.current[0]][moveLeftUp.current[1]][0].color === pieceToJump)
        || (intendedMove === JSON.stringify(jumpRightUp.current) && checkerboard[moveRightUp.current[0]][moveRightUp.current[1]][0].color === pieceToJump)
      ) {
        if (intendedMove === JSON.stringify(jumpLeftUp.current)) {
          jump(row, col, piece, moveLeftUp.current)
        } else if (intendedMove === JSON.stringify(jumpLeftDown.current)) {
          jump(row, col, piece, moveLeftDown.current)
        } else if (intendedMove === JSON.stringify(jumpRightUp.current)) {
          jump(row, col, piece, moveRightUp.current)
        } else if (intendedMove === JSON.stringify(jumpRightDown.current)) {
          jump(row, col, piece, moveRightDown.current)
        }
      }
    } else {
      //----Normal Move Scenarios
      if (intendedMove === JSON.stringify(moveLeft.current) || intendedMove === JSON.stringify(moveRight.current)) {
        console.log(moveLeft.current)
        move(row, col, piece);
        //----Normal Jump Scenarios
      } else if (
        (intendedMove === JSON.stringify(jumpLeft.current) && checkerboard[moveLeft.current[0]][moveLeft.current[1]][0].color === pieceToJump)
        ||
        (intendedMove === JSON.stringify(jumpRight.current) && checkerboard[moveRight.current[0]][moveRight.current[1]][0].color === pieceToJump)
      ) {
        if (intendedMove === JSON.stringify(jumpLeft.current)) {
          jump(row, col, piece, moveLeft.current)
        } else {
          jump(row, col, piece, moveRight.current)
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
        console.log(res)
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
                          piece.id === cell[0].id
                          ? "red-piece selection"
                          : "red-piece"
                          }>{cell[0].isKing ? 'king' : cell[0].id}</div>
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
                            piece.id === cell[0].id
                            ? "black-piece selection"
                            : "black-piece"
                            }>{cell[0].isKing ? 'king' : cell[0].id}
                        </div>
                      </div>
                    )
                  } else if (cell[0]?.name === 'valid') {
                    return (
                      <div onClick={piece ? () => movePiece(index, i) : null} key={i} className="checker-boxes"></div>
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
            <section className='everythingButScore'>
              <MoveHistory moves={moves} />
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
        <section className='chatBox'>
          <ChatBox handleMsgs={handleMessages} msgs={messages} socketId={socketId} />
        </section>
      </section>
    </section>
  )
}

export default Checkerboard;
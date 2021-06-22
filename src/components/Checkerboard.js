import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/checkerboard.css';

const Checkerboard = () => {
  const [valid, setValid] = useState({
    name: 'valid'
  })
  const [invalid, setInvalid] = useState({
    name: 'invalid'
  })
  const start = [
    [[invalid], [{ color: 'black', isKing: false, id: 1, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 2, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 3, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 4, hasJumped: false }]],
    [[{ color: 'black', isKing: false, id: 5, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 6, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 7, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 8, hasJumped: false }], [invalid]],
    [[invalid], [{ color: 'black', isKing: false, id: 9, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 10, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 11, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 12, hasJumped: false }]],
    [[valid], [invalid], [valid], [invalid], [valid], [invalid], [valid], [invalid]],
    [[invalid], [valid], [invalid], [valid], [invalid], [valid], [invalid], [valid]],
    [[{ color: 'red', isKing: false, id: 13, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 14, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 15, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 16, hasJumped: false }], [invalid]],
    [[invalid], [{ color: 'red', isKing: false, id: 17, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 18, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 19, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 20, hasJumped: false }]],
    [[{ color: 'red', isKing: false, id: 21, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 22, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 23, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 24, hasJumped: false }], [invalid]]
  ]
  const [oneScore, setOneScore] = useState(12)
  const [oneDisplay, setOneDisplay] = useState(0)
  const [redWins, setRedWins] = useState(0)
  const [blackWins, setBlackWins] = useState(0)
  const [twoScore, setTwoScore] = useState(12)
  const [twoDisplay, setTwoDisplay] = useState(0)
  const [turnState, setTurnState] = useState(true)
  const [pieceSelected, setPieceSelected] = useState(false)
  const [pieceIndex, setPieceIndex] = useState(null)
  const [jumpId, setJumpId] = useState(false)
  const [checkerboard, setCheckerboard] = useState(start)
  const [menuState, setMenuState] = useState(false)

  let piece;
  let moveLeft;
  let moveRight;
  let jumpLeft;
  let jumpRight;
  let pieceToJump;
  let moveLeftDown;
  let moveLeftUp;
  let moveRightDown;
  let moveRightUp;
  let jumpLeftDown;
  let jumpLeftUp;
  let jumpRightDown;
  let jumpRightUp;

  useEffect(() => {
    if (oneScore === 0) {
      alert('player 2 has won the game')
      setOneScore(12)
      setTwoScore(12)
      setBlackWins((curr) => {
        curr += 1
        return curr
      })
      setCheckerboard(start)
    } else if (twoScore === 0) {
      alert('player 1 has won the game')
      setTwoScore(12)
      setOneScore(12)
      setRedWins((curr) => {
        curr += 1
        return curr
      })
      setCheckerboard(start)
    }
  }, [checkerboard])

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

  // checkerboard[index][i]

  const selectionHandler = (row, col, piece) => {
    if (jumpId) {
      if (jumpId === piece.id) {
        setPieceSelected(piece)
        setPieceIndex([row, col])
      } else {
        console.log("must double jump");
      }
    } else {
      setPieceSelected(piece)
      setPieceIndex([row, col])
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

    let currCheck = [...checkerboard];

    currCheck[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
    currCheck[placeToJump[0]].splice(placeToJump[1], 1, [valid])
    currCheck[row].splice(col, 1, [piece])

    setCheckerboard(currCheck);

    if (turnState) {
      setTwoScore(score => {
        score = twoScore
        score -= 1
        return score
      })
      setOneDisplay(score => {
        score = oneDisplay
        score += 1
        return score
      })
    } else {
      setOneScore(score => {
        score = oneScore
        score -= 1
        return score
      })
      setTwoDisplay(score => {
        score = oneDisplay
        score += 1
        return score
      })
    }

    setPieceSelected(piece)

    let newIndex = [row, col];

    setPieceIndex(newIndex)
    availableMoves(newIndex)
    if (piece.isKing) {
      // EDGE LOGIC
      if ((((newIndex[0] === 0) && (newIndex[1] === 1)) || ((newIndex[0] === 1) && (newIndex[1] === 0))) && !(currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)) {
        console.log('ending turn')
        setJumpId(false)
        endTurn(newIndex)
      } else if (((((newIndex[0] === 0) && (newIndex[1] === 7)) || ((newIndex[0] === 1) && (newIndex[1] === 6))) && !(currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump))) {
        console.log('ending turn')
        setJumpId(false)
        endTurn(newIndex)
      } else if (((((newIndex[0] === 6) && (newIndex[1] === 7)) || ((newIndex[0] === 7) && (newIndex[1] === 6))) && !(currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump))) {
        console.log('ending turn')
        setJumpId(false)
        endTurn(newIndex)
      } else if (((((newIndex[0] === 7) && (newIndex[1] === 0)) || ((newIndex[0] === 6) && (newIndex[1] === 1))) && !(currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump))) {
        console.log('ending turn')
        setJumpId(false)
        endTurn(newIndex)
      }
      else {
        if ((newIndex[1] === 0 || newIndex[1] === 1) && ((currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
          || (currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump))) {
          console.log('we did it')
          setJumpId(piece.id)
        } else if ((newIndex[1] === 6 || newIndex[1] === 7) && ((currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump)
          || (currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump))) {
          console.log('we did it')
          setJumpId(piece.id)
        } else if ((newIndex[0] === 0 || newIndex[0] === 1) && ((currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)
          || (currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump))) {
          console.log('we did it')
          setJumpId(piece.id)
        } else if ((newIndex[0] === 6 || newIndex[0] === 7) && ((currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
          || (currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump))) {
          console.log('we did it')
          setJumpId(piece.id)
        } else if ((!(newIndex[0] === 6 || newIndex[0] === 7 || newIndex[0] === 0 || newIndex[0] === 1 || newIndex[1] === 0 || newIndex[1] === 1 || newIndex[1] === 6 || newIndex[1] === 7))) {
          if ((currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
            || (currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)
            || (currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump)
            || (currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump)) {
            console.log('we did it')
            setJumpId(piece.id)
          } else {
            console.log('ending turn')
            setJumpId(false)
            endTurn(newIndex)
          }
        } else {
          console.log('ending turn')
          setJumpId(false)
          endTurn(newIndex)
        }
      }
    } else {
      if ((((newIndex[0] === 0) || (newIndex[0] === 1)) || ((newIndex[0] === 7) || (newIndex[0] === 6)))) {
        console.log('ending turn')
        setJumpId(false);
        endTurn(newIndex);
      } else if ((((newIndex[1] === 0) || (newIndex[1] === 1)) && !(currCheck[jumpRight[0]][jumpRight[1]][0] === valid && currCheck[moveRight[0]][moveRight[1]][0].color === pieceToJump))
        ||
        ((newIndex[1] === 7) || (newIndex[1] === 6)) && !(currCheck[jumpLeft[0]][jumpLeft[1]][0] === valid && currCheck[moveLeft[0]][moveLeft[1]][0].color === pieceToJump)) {
        console.log('ending turn')
        setJumpId(false);
        endTurn(newIndex);
      } else {
        if ((newIndex[1] === 0) || (newIndex[1] === 1)) {
          if ((currCheck[jumpRight[0]][jumpRight[1]][0] === valid && currCheck[moveRight[0]][moveRight[1]][0].color === pieceToJump)) {
            console.log('we did it')
            setJumpId(piece.id)
          }
        } else if ((newIndex[1] === 6) || (newIndex[1] === 7)) {
          if ((currCheck[jumpLeft[0]][jumpLeft[1]][0] === valid && currCheck[moveLeft[0]][moveLeft[1]][0].color === pieceToJump)) {
            console.log('we did it')
            setJumpId(piece.id)
          }
        } else if ((currCheck[jumpRight[0]][jumpRight[1]][0] === valid && currCheck[moveRight[0]][moveRight[1]][0].color === pieceToJump) || (currCheck[jumpLeft[0]][jumpLeft[1]][0] === valid && currCheck[moveLeft[0]][moveLeft[1]][0].color === pieceToJump)) {
          console.log('we did it')
          setJumpId(piece.id)
        } else {
          console.log('ending turn')
          setJumpId(false);
          endTurn(newIndex);
        }
      }
    }
  }

  const endTurn = (newIndex) => {
    if ((piece.isKing === false) && (newIndex[0] === (turnState ? 0 : 7))) {
      piece.isKing = true;
    }

    console.log(piece.isKing)
    setTurnState(!turnState);
    setPieceSelected(false);
    setJumpId(false);
  }

  const concede = () => {
    if (turnState) {
      setOneScore(0)
      setCheckerboard(start)
      setTurnState(true)
    } else {
      setTwoScore(0)
      setCheckerboard(start)
      setTurnState(true)
    }
  }


  const movePiece = (row, col) => {

    availableMoves(pieceIndex);
    let intendedMove = [row, col]
    if (piece.isKing === true) {
      if (JSON.stringify(intendedMove) === JSON.stringify(moveLeftDown) || JSON.stringify(intendedMove) === JSON.stringify(moveRightDown) || JSON.stringify(intendedMove) === JSON.stringify(moveRightUp) || JSON.stringify(intendedMove) === JSON.stringify(moveLeftUp)) {
        move(row, col, piece);
      } else if ((JSON.stringify(intendedMove) === JSON.stringify(jumpLeftDown) && checkerboard[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump) || (JSON.stringify(intendedMove) === JSON.stringify(jumpRightDown) && checkerboard[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump) || (JSON.stringify(intendedMove) === JSON.stringify(jumpLeftUp) && checkerboard[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump) || (JSON.stringify(intendedMove) === JSON.stringify(jumpRightUp) && checkerboard[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)) {
        if (JSON.stringify(intendedMove) === JSON.stringify(jumpLeftUp)) {
          jump(row, col, piece, moveLeftUp)
        } else if (JSON.stringify(intendedMove) === JSON.stringify(jumpLeftDown)) {
          jump(row, col, piece, moveLeftDown)
        } else if (JSON.stringify(intendedMove) === JSON.stringify(jumpRightUp)) {
          jump(row, col, piece, moveRightUp)
        } else if (JSON.stringify(intendedMove) === JSON.stringify(jumpRightDown)) {
          jump(row, col, piece, moveRightDown)
        }
      }
    } else {
      if (JSON.stringify(intendedMove) === JSON.stringify(moveLeft) || JSON.stringify(intendedMove) === JSON.stringify(moveRight)) {
        move(row, col, piece);
      } else if ((JSON.stringify(intendedMove) === JSON.stringify(jumpLeft) && checkerboard[moveLeft[0]][moveLeft[1]][0].color === pieceToJump) || (JSON.stringify(intendedMove) === JSON.stringify(jumpRight) && checkerboard[moveRight[0]][moveRight[1]][0].color === pieceToJump)) {
        if (JSON.stringify(intendedMove) === JSON.stringify(jumpLeft)) {
          jump(row, col, piece, moveLeft)
        } else {
          jump(row, col, piece, moveRight)
        }
      } else {
        alert('illegal move')
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

  return (
    <section className='checkerboardFrame'>
      <section className={`leftBox ${menuState ? 'hidden' : 'shown'}`}>
        <button className='menuLines' onClick={() => expandMenu()}>
          <div className='menuLine'>-</div>
          <div className='menuLine'>-</div>
          <div className='menuLine'>-</div>
        </button>
        <section className='homeLink'>
          <Link className='linkSpacing' to='/landingpage' >
            <img className='homeIcon' src='http://assets.stickpng.com/thumbs/588a6758d06f6719692a2d22.png'></img>
            <p className='homeText'>Home</p>
          </Link>
        </section>
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
                        <div onClick={turnState ? () => selectionHandler(index, i, cell[0]) : null} className="red-piece">{cell[0].isKing ? 'king' : cell[0].id}</div>
                      </div>
                    )
                  } else if (cell[0]?.color === 'black') {
                    return (
                      <div key={i} className="checker-boxes">
                        <div onClick={turnState ? null : () => selectionHandler(index, i, cell[0])} className="black-piece">{cell[0].isKing ? 'king' : cell[0].id}</div>
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
            <section className='everythingButScore'>
              <div>placeholder</div>
            </section>
            <section className='scoreBox'>
              <h1> Red Score: {oneDisplay} </h1>
              <h1> Black Score: {twoDisplay} </h1>
            </section>
          </section>
          {/* <button className='concedeButton' onClick={() => concede()}> Concede </button> */}
        </section>
        <section className='chatBox'>
          <div>This is just a placeholder</div>
        </section>
      </section>
    </section>
  )
}

export default Checkerboard;
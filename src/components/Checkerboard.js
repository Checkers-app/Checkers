import { useState, useEffect } from "react";

const Checkerboard = () => {
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
    let newIndex = [row, col];
    let currCheck = [...checkerboard];
    const landingSpot = JSON.stringify(newIndex)
    //----Corner spots
    const topLeftCornerUp = JSON.stringify([0,1])
    const topLeftCornerDown = JSON.stringify([1,0])
    const topRightCornerUp = JSON.stringify([0,7])
    const topRightCornerDown = JSON.stringify([1,6])
    const bottomRightCornerUp = JSON.stringify([6,7])
    const bottomRightCornerDown = JSON.stringify([7,6])
    const bottomLeftCornerUp = JSON.stringify([6,1])
    const bottomLeftCornerDown = JSON.stringify([7,0])
    
    //----MAKE JUMP----
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
      if (((landingSpot === topLeftCornerUp) || (landingSpot === topLeftCornerDown)) 
      // && !(currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)
      ) {
        console.log('TLC: ending turn')
        setJumpId(false)
        endTurn(newIndex)
      } else if (((landingSpot === topRightCornerUp) || (landingSpot === topRightCornerDown)) 
      // && !(currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump)
      ) {
        console.log('TRC: ending turn')
        setJumpId(false)
        endTurn(newIndex)
      } else if (((landingSpot === bottomRightCornerUp) || (landingSpot === bottomRightCornerDown))
      // && !(currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump))
      ) {
        console.log('BRC: ending turn')
        setJumpId(false)
        endTurn(newIndex)
      } else if (((landingSpot === bottomLeftCornerUp) || (landingSpot === bottomLeftCornerDown)) 
      // && !(currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump))
      ) {
        console.log('BLC: ending turn')
        setJumpId(false)
        endTurn(newIndex)
      }
      else {
        if ((newIndex[1] === 0 || newIndex[1] === 1) && ((currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
          || (currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump))) {
          console.log('line 188: we did it')
          setJumpId(piece.id)
        } else if ((newIndex[1] === 6 || newIndex[1] === 7) && ((currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump)
          || (currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump))) {
          console.log('line 192: we did it')
          setJumpId(piece.id)
        } else if ((newIndex[0] === 0 || newIndex[0] === 1) && ((currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)
          || (currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump))) {
          console.log('line 196: we did it')
          setJumpId(piece.id)
        } else if ((newIndex[0] === 6 || newIndex[0] === 7) && ((currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
          || (currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump))) {
          console.log('line 200: we did it')
          setJumpId(piece.id)
        } else if ((!(newIndex[0] === 6 || newIndex[0] === 7 || newIndex[0] === 0 || newIndex[0] === 1 || newIndex[1] === 0 || newIndex[1] === 1 || newIndex[1] === 6 || newIndex[1] === 7))) {
          if ((currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump)
            || (currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)
            || (currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump)
            || (currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump)) {
            console.log('line 207: we did it')
            setJumpId(piece.id)
          } else {
            console.log('line 203: ending turn')
            setJumpId(false)
            endTurn(newIndex)
          }
        } else {
          console.log('line 208: ending turn')
          setJumpId(false)
          endTurn(newIndex)
        }
      }
    } else {
      if ((((newIndex[0] === 0) || (newIndex[0] === 1)) || ((newIndex[0] === 7) || (newIndex[0] === 6)))) {
        console.log('line 215: ending turn')
        setJumpId(false);
        endTurn(newIndex);
      } else if ((((newIndex[1] === 0) || (newIndex[1] === 1)) && !(currCheck[jumpRight[0]][jumpRight[1]][0] === valid && currCheck[moveRight[0]][moveRight[1]][0].color === pieceToJump))
        ||
        ((newIndex[1] === 7) || (newIndex[1] === 6)) && !(currCheck[jumpLeft[0]][jumpLeft[1]][0] === valid && currCheck[moveLeft[0]][moveLeft[1]][0].color === pieceToJump)) {
        console.log('line 221: ending turn')
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
          console.log('line 239: ending turn')
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

  return (
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
      <h1> {turnState ? 'player 1' : 'player 2'}</h1>
      <button onClick={() => concede()}> Concede </button>
      <h1> Red Score: {redWins} </h1>
      <h1> Black Score: {blackWins} </h1>
    </div>
  )
}

export default Checkerboard;
import { useState, useEffect } from "react";

const Checkerboard = () => {
  const [valid, setValid] = useState({
    name: 'valid'
  })
  const [invalid, setInvalid] = useState({
    name: 'invalid'
  })
  const [oneScore, setOneScore] = useState(12)
  const [twoScore, setTwoScore] = useState(12)
  const [turnState, setTurnState] = useState(true)
  const [pieceSelected, setPieceSelected] = useState(false)
  const [pieceIndex, setPieceIndex] = useState(null)
  const [jumpId, setJumpId] = useState(false)
  const [checkerboard, setCheckerboard] = useState([
    [[invalid], [{ color: 'red', isKing: false, id: 1, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 2, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 3, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 4, hasJumped: false }]],
    [[{ color: 'red', isKing: false, id: 5, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 6, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 7, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 8, hasJumped: false }], [invalid]],
    [[invalid], [{ color: 'red', isKing: false, id: 9, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 10, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 11, hasJumped: false }], [invalid], [{ color: 'red', isKing: false, id: 12, hasJumped: false }]],
    [[valid], [invalid], [valid], [invalid], [valid], [invalid], [valid], [invalid]],
    [[invalid], [valid], [invalid], [valid], [invalid], [valid], [invalid], [valid]],
    [[{ color: 'black', isKing: false, id: 13, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 14, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 15, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 16, hasJumped: false }], [invalid]],
    [[invalid], [{ color: 'black', isKing: false, id: 17, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 18, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 19, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 20, hasJumped: false }]],
    [[{ color: 'black', isKing: false, id: 21, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 22, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 23, hasJumped: false }], [invalid], [{ color: 'black', isKing: false, id: 24, hasJumped: false }], [invalid]]
  ])

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
    } else if (twoScore === 0) {
      alert('player 1 has won the game')
    }
  }, [checkerboard])

  const availableMoves = (curr) => {
    // let intendedMove = [row, col]

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
      if (turnState) {
        // piece = pieceSelected
        // pieceToJump = "black"
        moveLeft = [curr[0] + 1, curr[1] - 1]
        jumpLeft = [curr[0] + 2, curr[1] - 2]
        moveRight = [curr[0] + 1, curr[1] + 1]
        jumpRight = [curr[0] + 2, curr[1] + 2]
      } else {
        // piece = pieceSelected
        // pieceToJump = "red"
        moveLeft = [curr[0] - 1, curr[1] - 1]
        jumpLeft = [curr[0] - 2, curr[1] - 2]
        moveRight = [curr[0] - 1, curr[1] + 1]
        jumpRight = [curr[0] - 2, curr[1] + 2]
      }
    }

  }

  // checkerboard[index][i]

  const selectionHandler = (row, col, piece) => {
    // DoubleJump----
    // check if jumpId exists
    // compare if piece.id === jumpId
    // if not, return;
    // RegularMove---
    // check turnState === true
    // if piece.color === 'red'
    // execute normal stuff
    // check turnState === false
    // if piece.color === 'black'
    // execute normal stuff
    if (jumpId) {
      if (jumpId === piece.id) {
        setPieceSelected(piece)
        setPieceIndex([row, col])
        // availableMoves()
      } else {
        console.log("must double jump");
      }
    } else {
      setPieceSelected(piece)
      setPieceIndex([row, col])
      // availableMoves()
    }
  }

  const move = (row, col, piece) => {

    let newIndex = [row, col]

    setCheckerboard((curr) => {
      curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
      curr[row].splice(col, 1, [piece])
      return curr
    })
    endTurn(newIndex);
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
    } else {
      setOneScore(score => {
        score = oneScore
        score -= 1
        return score
      })
    }

    setPieceSelected(piece)

    let newIndex = [row, col];

    setPieceIndex(newIndex)
    availableMoves(newIndex)

    // check if move is available, if there is then setTurnState, if not don't setTurnState

    // doubleJumpAvailable()

    // console.log("jumpRight: " + jumpRight)
    // console.log("arr: " + arr)
    // console.log(currCheck[jumpRight[0]][jumpRight[1]][0])
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
      // else {
      // // left or identify logic
      // if ((((newIndex[1] === 0 || newIndex[1] === 1) && !(currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump))
      // &&
      // ((newIndex[1] === 0 || newIndex[1] === 1) && !(currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)))
      // ||
      // (((newIndex[1] === 6 || newIndex[1] === 7) && !(currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump))
      // &&
      // ((newIndex[1] === 6 || newIndex[1] === 7) && !(currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump)))) {
      //   console.log('ending turn')
      //   setJumpId(false)
      //   endTurn(newIndex) 
      // }
      // // Top or bottom identify logic
      // else if ((((newIndex[0] === 0 || newIndex[0] === 1) && !(currCheck[jumpRightUp[0]][jumpRightUp[1]][0] === valid && currCheck[moveRightUp[0]][moveRightUp[1]][0].color === pieceToJump))
      // &&
      //   ((newIndex[0] === 0 || newIndex[0] === 1) && !(currCheck[jumpRightDown[0]][jumpRightDown[1]][0] === valid && currCheck[moveRightDown[0]][moveRightDown[1]][0].color === pieceToJump)))
      //   ||
      //   (((newIndex[0] === 6 || newIndex[0] === 7) && !(currCheck[jumpLeftUp[0]][jumpLeftUp[1]][0] === valid && currCheck[moveLeftUp[0]][moveLeftUp[1]][0].color === pieceToJump))
      //   &&
      //   ((newIndex[0] === 6 || newIndex[0] === 7) && !(currCheck[jumpLeftDown[0]][jumpLeftDown[1]][0] === valid && currCheck[moveLeftDown[0]][moveLeftDown[1]][0].color === pieceToJump)))) {
      //   console.log('ending turn')
      //   setJumpId(false)
      //   endTurn(newIndex)} 
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
        // console.log('ending turn')
        // setJumpId(false)
        // endTurn(newIndex) 
        // }
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
          // console.log(piece.isKing);
          console.log('ending turn')
          setJumpId(false);
          endTurn(newIndex);
        }
      }
    }
  }

  // console.log(pieceIndex)

  const endTurn = (newIndex) => {
    if ((piece.isKing === false) && (newIndex[0] === (turnState ? 7 : 0))) {
      piece.isKing = true;
    }

    console.log(piece.isKing)
    setTurnState(!turnState);
    setPieceSelected(false);
    setJumpId(false);
  }

  // console.log(jumpId)
  const movePiece = (row, col) => {

    availableMoves(pieceIndex);

    // let piece;
    // let moveLeft;
    // let moveRight;
    // let jumpLeft;
    // let jumpRight;
    // let pieceToJump;
    let intendedMove = [row, col]
    // if (turnState) {
    //   piece = pieceSelected
    //   pieceToJump = "black"
    //   moveLeft = [pieceIndex[0] + 1, pieceIndex[1] - 1]
    //   jumpLeft = [pieceIndex[0] + 2, pieceIndex[1] - 2]
    //   moveRight = [pieceIndex[0] + 1, pieceIndex[1] + 1]
    //   jumpRight = [pieceIndex[0] + 2, pieceIndex[1] + 2]
    // } else {
    //   piece = pieceSelected
    //   pieceToJump = "red"
    //   moveLeft = [pieceIndex[0] - 1, pieceIndex[1] - 1]
    //   jumpLeft = [pieceIndex[0] - 2, pieceIndex[1] - 2]
    //   moveRight = [pieceIndex[0] - 1, pieceIndex[1] + 1]
    //   jumpRight = [pieceIndex[0] - 2, pieceIndex[1] + 2]
    // }
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
                    <div onClick={turnState ? () => selectionHandler(index, i, cell[0]) : null} className="red-piece">{cell[0].id}</div>
                  </div>
                )
              } else if (cell[0]?.color === 'black') {
                return (
                  <div key={i} className="checker-boxes">
                    <div onClick={turnState ? null : () => selectionHandler(index, i, cell[0])} className="black-piece">{cell[0].id}</div>
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
    </div>
  )
}

export default Checkerboard;
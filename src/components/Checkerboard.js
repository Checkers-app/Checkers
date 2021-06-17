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
    if(jumpId){
      if(jumpId === piece.id){
        setPieceSelected(piece)
        setPieceIndex([row, col])
      }
      
    }
    setPieceSelected(piece)
    setPieceIndex([row, col])
  }

  const move = (row, col, piece) => {
    setCheckerboard((curr) => {
      curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
      curr[row].splice(col, 1, [piece])
      return curr
    })
    setTurnState(!turnState)
  }

  const jump = (row, col, piece, placeToJump) => {
    setCheckerboard((curr) => {
      curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
      curr[placeToJump[0]].splice(placeToJump[1], 1, [valid])
      curr[row].splice(col, 1, [piece])
      return curr
    })
    setJumpId(piece.id)
    // check if move is available, if there is then setTurnState, if not don't setTurnState
    setTurnState(!turnState)
  }

  console.log(jumpId)
  const movePiece = (row, col) => {
    let piece;
    let moveLeft;
    let moveRight;
    let jumpLeft;
    let jumpRight;
    let pieceToJump;
    let intendedMove = [row, col]
    if (turnState) {
      piece = pieceSelected
      pieceToJump = "black"
      moveLeft = [pieceIndex[0] + 1, pieceIndex[1] - 1]
      jumpLeft = [pieceIndex[0] + 2, pieceIndex[1] - 2]
      moveRight = [pieceIndex[0] + 1, pieceIndex[1] + 1]
      jumpRight = [pieceIndex[0] + 2, pieceIndex[1] + 2]
    } else {
      piece = pieceSelected
      pieceToJump = "red"
      moveLeft = [pieceIndex[0] - 1, pieceIndex[1] - 1]
      jumpLeft = [pieceIndex[0] - 2, pieceIndex[1] - 2]
      moveRight = [pieceIndex[0] - 1, pieceIndex[1] + 1]
      jumpRight = [pieceIndex[0] - 2, pieceIndex[1] + 2]
    }

    if (JSON.stringify(intendedMove) === JSON.stringify(moveLeft) || JSON.stringify(intendedMove) === JSON.stringify(moveRight)) {
      move(row, col, piece);
      setPieceSelected(false)
    } else if ((JSON.stringify(intendedMove) === JSON.stringify(jumpLeft) && checkerboard[moveLeft[0]][moveLeft[1]][0].color === pieceToJump) || (JSON.stringify(intendedMove) === JSON.stringify(jumpRight) && checkerboard[moveRight[0]][moveRight[1]][0].color === pieceToJump)) {
      if (JSON.stringify(intendedMove) === JSON.stringify(jumpLeft)) {
        jump(row, col, piece, moveLeft)
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
        setPieceSelected(false)
      } else {
        jump(row, col, piece, moveRight)
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
        setTurnState(!turnState)
        setPieceSelected(false)
      }
    } else {
      alert('illegal move')
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
                    <div onClick={() => selectionHandler(index, i, cell[0])} className="red-piece">{cell[0].id}</div>
                  </div>
                )
              } else if (cell[0]?.color === 'black') {
                return (
                  <div key={i} className="checker-boxes">
                    <div onClick={() => selectionHandler(index, i, cell[0])} className="black-piece">{cell[0].id}</div>
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

export default Checkerboard
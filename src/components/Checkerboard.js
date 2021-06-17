import { useState, useEffect } from "react";

const Checkerboard = () => {

    const [ redPiece, setRedPiece ] = useState({
        name: 'red'
    })
    const [ blackPiece, setBlackPiece ] = useState({
        name: 'black'
    })
    const [ valid, setValid ] = useState({
        name: 'valid'
    })
    const [ invalid, setInvalid ] = useState({
        name: 'invalid'
    })
    const [ oneScore, setOneScore ] = useState(12)
    const [ twoScore, setTwoScore ] = useState(12)
    const [ turnState, setTurnState ] = useState(true)
    const [ pieceSelected, setPieceSelected ] = useState(false)
    const [ pieceIndex, setPieceIndex ] = useState(null)
    const [checkerboard, setCheckerboard ] = useState([
        [[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece]],
        [[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid]],
        [[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece]],
        [[valid],[invalid],[valid],[invalid],[valid],[invalid],[valid],[invalid]],
        [[invalid],[valid],[invalid],[valid],[invalid],[valid],[invalid],[valid]],
        [[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid]],
        [[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece]],
        [[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid]]
    ])
    // checkerboard[index][i]
    
    const selectionHandler = (row, col) => {
        setPieceSelected(true)
        setPieceIndex([row, col])


        // console.log('row' + ' ' + row)
        // console.log('column' + ' ' + col)
    }
    
    const movePiece = (row, col) => {
        //Define jumpLeft/jumpRight
        //compare intendedMove to jumpLeft/jumpRight
        //if intendedMove equals jumpLeft/jumpRight
        //check the Checkerboard array at moveLeft/moveRight
        //if moveLeft/moveRight is opposite piece
        //then change jump to piece
        //change moveLeft/moveRight to valid
        //Later---keep turnState same if another jump is available
        let piece;
        let moveLeft;
        let moveRight;
        let jumpLeft;
        let jumpRight;
        let pieceToJump;
        let intendedMove = [row,col]
        if(turnState){
          piece = redPiece
          pieceToJump = blackPiece.name
          moveLeft = [pieceIndex[0]+ 1, pieceIndex[1]-1]
          jumpLeft = [pieceIndex[0] +2, pieceIndex[1]-2]
          moveRight = [pieceIndex[0]+ 1, pieceIndex[1]+1]
          jumpRight = [pieceIndex[0]+ 2, pieceIndex[1]+2]
        } else {
          piece = blackPiece
          pieceToJump = redPiece.name
          moveLeft = [pieceIndex[0]- 1, pieceIndex[1]-1]
          jumpLeft = [pieceIndex[0]- 2, pieceIndex[1]-2]
          moveRight = [pieceIndex[0]-1, pieceIndex[1]+1]
          jumpRight = [pieceIndex[0]-2, pieceIndex[1]+2]
        }

        if(JSON.stringify(intendedMove) === JSON.stringify(moveLeft) || JSON.stringify(intendedMove) === JSON.stringify(moveRight)) {
          setCheckerboard((curr) => {
            curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
            curr[row].splice(col, 1, [piece])
            return curr
        })
        setTurnState(!turnState)
        setPieceSelected(false)
        } else if((JSON.stringify(intendedMove) === JSON.stringify(jumpLeft) && checkerboard[moveLeft[0]][moveLeft[1]][0].name === pieceToJump )|| (JSON.stringify(intendedMove) === JSON.stringify(jumpRight) && checkerboard[moveRight[0]][moveRight[1]][0].name === pieceToJump)) {
          if(JSON.stringify(intendedMove) === JSON.stringify(jumpLeft)){
            setCheckerboard((curr) => {
              curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
              curr[moveLeft[0]].splice(moveLeft[1], 1, [valid])
              curr[row].splice(col, 1, [piece])
              return curr
            })
            if(turnState) {
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
          } else {
            setCheckerboard((curr) => {
              curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
              curr[moveRight[0]].splice(moveRight[1], 1, [valid])
              curr[row].splice(col, 1, [piece])
              return curr
            })
            if(turnState) {
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
    console.log(oneScore)
    console.log(twoScore)
    
    return (
      <div className='spacing'>
       {/* <DemoCheckers /> */}
       {checkerboard.map((row, index) => {
         return (
          <div key={index} className="row">
            {row.map((cell, i) => {
              if(cell[0]?.name === 'red') {
                return (
                  <div key={i} className="checker-boxes">
                    <div onClick={turnState ? () => selectionHandler(index, i) : null} className="red-piece"></div>
                  </div>
                )
              } else if(cell[0]?.name === 'black') {
                return (
                  <div key={i} className="checker-boxes">
                    <div onClick={turnState ? null : () => selectionHandler(index, i)} className="black-piece"></div>
                  </div>
                )
              } else if(cell[0]?.name === 'valid') {
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
       } )}
       <h1> {turnState ? 'player 1' : 'player 2'}</h1>
      </div>
    )
  }
  
export default Checkerboard
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
        let piece;
        if(turnState){
             piece = redPiece
        } else {
             piece = blackPiece
        }
        setCheckerboard((curr) => {
            curr[pieceIndex[0]].splice(pieceIndex[1], 1, [valid])
            curr[row].splice(col, 1, [piece])
            return curr
        })
        console.log(checkerboard) 
        setTurnState(!turnState)
        setPieceSelected(false)
    }
    
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
      </div>
    )
  }
  
export default Checkerboard
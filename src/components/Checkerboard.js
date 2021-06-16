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
  
    const checkerboard = [
      [[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece]],
      [[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid]],
      [[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece],[invalid],[redPiece]],
      [[valid],[invalid],[valid],[invalid],[valid],[invalid],[valid],[invalid]],
      [[invalid],[valid],[invalid],[valid],[invalid],[valid],[invalid],[valid]],
      [[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid]],
      [[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece]],
      [[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid],[blackPiece],[invalid]]
    ]
  
    // checkerboard[index][i]
    
    return (
      <div className='spacing'>
       {/* <DemoCheckers /> */}
       {checkerboard.map((row, index) => {
         return (
          <div key={index} className="row">
            {row.map((cell, i) => {
              if(cell[0].name === 'red') {
                return (
                  <div key={i} className="checker-boxes">
                    <div className="red-piece"></div>
                  </div>
                )
              } else if(cell[0].name === 'black') {
                return (
                  <div key={i} className="checker-boxes">
                    <div className="black-piece"></div>
                  </div>
                )
              } else if(cell[0].name === 'valid') {
                return (
                  <div key={i} className="checker-boxes"></div>
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
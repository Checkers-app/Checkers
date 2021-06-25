import '../css/checkerboard.css'
import React, { useEffect, useRef } from 'react'

const MoveHistory = (props) => {

  const movesEndRef = useRef()

  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props]);

  return (
    <div id="moves-list">
      {props.moves.map((e, i) => {
        return <h1 key={i} className='indTurnText'> {e} </h1>
      })}
      <div ref={movesEndRef} id="mover" />
    </div>
  )
}

export default MoveHistory;
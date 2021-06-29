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
      {
        props.moves.map((e, i) => {
          if (e.newMove.color === 'red') {
            return <li key={i} className='indTurnText'> Turn {i + 1}: {`${e.newMove.color} moved ${e.newMove.id} to ${e.newMove.landing[1] + 1}, ${7 - e.newMove.landing[0] + 1}`} </li>
          } else if (e.newMove.color === 'black') {
            return <li key={i} className='indTurnTextTwo'> Turn {i + 1}: {`${e.newMove.color} moved ${e.newMove.id} to ${e.newMove.landing[1] + 1}, ${7 - e.newMove.landing[0] + 1}`} </li>
          }
        })
      }
      <div ref={movesEndRef} id="mover" />
    </div>
  )
}

export default MoveHistory;
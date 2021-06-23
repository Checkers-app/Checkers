import '../css/checkerboard.css'
import React, { useEffect, useRef } from 'react'

const Movehistory = (props) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props]);

  return (
    <div>
      {props.moves.map(e => {
        return <h1 className='indTurnText'> {e} </h1>
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Movehistory
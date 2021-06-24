import { useState, useEffect, useRef } from 'react'
import '../css/Chat-Styling/chat.css'

const ChatBox = (props) => {
  const [userInput, setUserInput] = useState('')

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props]);

  const handleInput = (value) => {
    setUserInput(value)
  }

  const handleEnterKey = (event) => {
    if(event.key === 'Enter') {
      handleSubmitClick()
    }
  }

  const handleSubmitClick = () => {
    props.handleMsgs(userInput)
    setUserInput('')
  } 

  return (
    <div id="chat-box">
      <div id="chat">
        {props.msgs.map((e,i) => {
          return <h1 className="chat-message" key={i}> {e} </h1>
        })}
        <div ref={messagesEndRef} />
      </div>
      <div id="user-chat-bar">
        <input 
          id="chat-input" 
          value={userInput} 
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <button 
          id="chat-submit" 
          onClick={() => handleSubmitClick()}
        > Send </button>
      </div>
    </div>
  )
}

export default ChatBox
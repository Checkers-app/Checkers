import { useState, useEffect, useRef, useContext} from 'react'
import { UserContext } from '../context/UserContext.js';
import '../css/Chat-Styling/chat.css'

const ChatBox = (props) => {
  const [userInput, setUserInput] = useState('')
  const { user } = useContext(UserContext);

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
    const userMessage = {
      message: userInput,
      username: user.username
    }
    props.handleMsgs(userMessage)
    setUserInput('')
  } 

  return (
    <div id="chat-box">
      <input type="hidden" value="something"/>
      <div id="chat">
        {props.msgs.map((e,i) => {
          if(e.socketId === props.socketId) {
            return (
              <div key={i} className="message-row flex-end">
                <div className="chat-message flex-end darker">
                  <p className="msg"> {e.message} </p>
                </div>
                <p className="signature">{user.username}-</p>
              </div>
            )
          } else {
            return (
              <div key={i} className="message-row flex-start">
                <div className="chat-message flex-start">
                  <p className="msg"> {e.message} </p>
                </div>
                <p className="signature">-{e.username}</p>
              </div>
            )
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div id="user-chat-bar">
        <input 
          id="chat-input" 
          value={userInput} 
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
          autoComplete="off"
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
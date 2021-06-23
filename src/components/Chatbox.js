import { useState } from 'react'

const ChatBox = (props) => {
  const [userInput, setUserInput] = useState('')
  console.log(props)

  const handleInput = (value) => {
    setUserInput(value)
  }

  return (
    <div> Chatbox stuff
      <input value={userInput} onChange={(e) => handleInput(e.target.value)} />
      <button onClick={() => {
        props.handleMsgs(userInput)
        setUserInput('')
      }}> Send </button>
      {props.msgs.map(e => {
        return <h1> {e} </h1>
      })}
    </div>
  )
}

export default ChatBox
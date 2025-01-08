import React, { useState } from 'react'
import { BsArrowBarDown } from 'react-icons/bs'
import { AiOutlineSend, AiOutlineDelete } from 'react-icons/ai'
import './Chatbot.css'
import ChatMessage from './ChatMessage'
import Chat from "../../assets/chatbot.png"

const Chatbot = ({ setIsOpen }) => {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const chatLogNew = [...chatLog, { user: 'me', message: input }]
    setInput('')
    setChatLog(chatLogNew)
    const messages = chatLogNew.map(message => message.message).join('\n')
    try {
      const response = await fetch('https://ai-quest-backend.onrender.com/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messages
        })
      })
      const data = await response.json()
      setChatLog([...chatLogNew, { user: 'user', message: data.message }])
    } catch (error) {
      setChatLog([...chatLogNew, { user: 'user', message: 'Some error occurred. Try another question' }])
    }
  }

  return (
    <div className='chatbot-container'>
      <div className="chatbot-header">
        <div className='chatbot-header1'>
          <BsArrowBarDown
            className='chatbot-icon'
            size={20}
            onClick={() => setIsOpen((isOpen) => !isOpen)} />
          <AiOutlineDelete 
            className='chatbot-icon'
            size={20}
            onClick={() => setChatLog([])}
          />
        </div>
        {/* <p>AI Chatbot</p> */}
        <img className='chat' src={Chat} alt="" />
        
      </div>
      <div className="chatbot-chatwindow">
        {chatLog.length === 0 && <span className='chatbot-chatwindow-starter'>Ask your queries!</span>}
        {chatLog.map((message, index) => (
          <ChatMessage message={message} key={index} />
        ))}
      </div>
      <form className='chatbot-form' onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
          className='chatbot-input' 
          placeholder='Enter your doubt...'
        />
        <button
          className='chatbot-button'
          type="submit"
        >
          <AiOutlineSend size={15} />
        </button>
      </form>
    </div>
  )
}

export default Chatbot

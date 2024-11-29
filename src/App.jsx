import React, { useState } from 'react'
import ChatBotStart from './Components/chatBotStart'
import ChatBotApp from './Components/ChatBotApp'

const App = ()=> {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState([])

  const handleStartChat = () => {
    setIsChatting(true)

    if(chats.length === 0) {
      const newChat = {
        id: 'Chat ${new Date().toLocalDateString("de-DE")} ${new Date().toLocaleTimeString()}',
        messages: []
      }
      setChats([newChat])
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  return (
    <div className='container'>
      {!isChatting ? (
        <ChatBotStart onStartChat={handleStartChat} />
      ) : (
        <ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} />
      )}
    </div>
  )
}

export default App
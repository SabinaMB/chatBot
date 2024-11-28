import React from 'react'
import './ChatBotApp.css'

const ChatBotApp = ({onGoBack}) => {
  return (
    <div className='chatApp'>
        <div className='chatList'>
            <div className='chatListHeader'>
                <h4>Chat List</h4>
                    <i className='bx bx-edit-alt newChat'></i>
            </div>
            <div className='chatListItem active'>
                <h5>Chat 20/11/24 1:54:23 pm</h5>
                <i className='bx bx-x-circle x'></i>
            </div>
            <div className='chatListItem'>
                <h5>Chat 20/11/24 1:54:23 pm</h5>
                <i className='bx bx-x-circle x'></i>
            </div>
            <div className='chatListItem'>
                <h5>Chat 20/11/24 1:54:23 pm</h5>
                <i className='bx bx-x-circle x'></i>
            </div>
        </div>
        <div className='chatWindow'>
            <div className='chatTitle'>
                <h3>Ask the Bot</h3>
                {/* <i className='bx bx-arrow-back arrow'></i> */}
                <button className='home' onClick={onGoBack}>
                <i className='fa-solid fa-home'></i>
                </button>
            </div>
            <div className='chat'>
                <div className='prompt'>
                    Hi, how are you? How can I help you today? <span>12:59:51 PM</span>
                </div>
                <div className='response'>
                    I am fine, thank you. <span>12:59:51 PM</span>
                </div>
                <div className='typing'>Typing...</div>
                <form className='msgForm'>
                    <i className='fa-solid fa-face-smile emoji'></i>
                    <input type='text' className='msgInput' placeholder='Type a message' />
                    <i className='fa-solid fa-paper-plane'></i>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ChatBotApp
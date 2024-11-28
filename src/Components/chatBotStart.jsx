import React from 'react'
import './ChatBotStart.css'
import botImage from '../assets/bot6.png'


const chatBotStart = () => {
  return (
    <div className='startPage'>
        <img src={botImage} alt='bot' className='botImage'/>
        <button className='startButton'>Let's chat</button>
    </div>
  )
}

export default chatBotStart
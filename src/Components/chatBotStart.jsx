import React from 'react'
import './chatBotStart.css'
import botImage from '../assets/bot4.png'


const chatBotStart = () => {
  return (
    <div className='startPage'>
        <img src={botImage} alt='bot' className='botImage'/>
        <button className='startButton'>Let's chat</button>
    </div>
  )
}

export default chatBotStart
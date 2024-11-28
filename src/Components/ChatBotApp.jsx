import React from 'react'

const ChatBotApp = () => {
  return (
    <div className='chatApp'>
        <div className='chatList'>
            <div className='chatListHeader'>
                <h2>Chat List</h2>
                    <i className='bx bx-edit-alt new-chat'></i>
            </div>
            <div className='chatListItem'>
                <h4>Chat 20/11/24 1:54:23 pm</h4>
                <i className='bx bx-x circle'></i>
            </div>
            <div className='chatListItem'>
                <h4>Chat 20/11/24 1:54:23 pm</h4>
                <i className='bx bx-x circle'></i>
            </div>
            <div className='chatListItem'>
                <h4>Chat 20/11/24 1:54:23 pm</h4>
                <i className='bx bx-x circle'></i>
            </div>
        </div>
    </div>
  )
}

export default ChatBotApp
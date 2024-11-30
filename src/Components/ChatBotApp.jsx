
import React, { useState } from 'react';
import './ChatBotApp.css';

const ChatBotApp = ({ onGoBack, chats, setChats }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      type: 'prompt',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updateMessages = [...messages, newMessage];
    setMessages(updateMessages);
    setInputValue('');

    const updatedChats = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chat, messages: updateMessages };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  return (
    <div className="chatApp">
    
      <div className="chatList">
        <div className="chatListHeader">
          <h4>Chat List</h4>
          <i className="bx bx-edit-alt newChat"></i>
        </div>
        {/* {chats.map((chat, index) => (
          <div key={index} className={`chatListItem ${index === 0 ? 'active' : ''}`}>
            <h5>{chat.id}</h5> */}
        {chats.map((chat, index) => (
            <div key={index} className={`chatListItem ${index === 0 ? 'active' : ''}`}>
             <h5>
             {`${new Date().toLocaleDateString("de-DE")} ${new Date().toLocaleTimeString()}`}
             </h5>

            <i className="bx bx-x-circle x"></i>
          </div>
        ))}
      </div> 

      
      <div className="chatWindow">
        <div className="chatTitle">
          <h3>Ask the Bot</h3>
          <button className="home" onClick={onGoBack}>
            <i className="fa-solid fa-home"></i>
          </button>
        </div>
        <div className="chat">
          <div className="prompt">
            Hi, how are you? How can I help you today? <span>12:59:51 PM</span>
          </div>
          <div className="response">
            I am fine, thank you. <span>12:59:51 PM</span>
          </div>
          <div className="typing">Typing...</div>
          <form
            className="msgForm"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <i className="fa-solid fa-face-smile emoji"></i>
            <input
              type="text"
              className="msgInput"
              placeholder="Type a message"
              value={inputValue}
              onChange={handleInputChange}
            />
            <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotApp;

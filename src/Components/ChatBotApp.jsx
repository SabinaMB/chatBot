import React, { useEffect, useRef, useState } from "react";
import "./ChatBotApp.css";

const ChatBotApp = ({
  onGoBack,
  chats,
  setChats,
  activeChat,
  setActiveChat,
  onNewChat,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObj ? activeChatObj.messages : []);
  }, [activeChat, chats]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    if (!activeChat) {
      onNewChat(inputValue);
      setInputValue("");
    } else {
      const updateMessages = [...messages, newMessage];
      setMessages(updateMessages);
      setInputValue("");

      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updateMessages };
        }
        return chat;
      });
      setChats(updatedChats);
      setIsTyping(true);

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputValue }],
            max_tokens: 150,
          }),
        }
      );
      const data = await response.json();
      const chatResponse = data.choices[0].message.content.trim();

      const newResponse = {
        type: "response",
        text: chatResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      const updatesMessagesWithResponse = [...updateMessages, newResponse];
      setMessages(updatesMessagesWithResponse);
      setIsTyping(false);

      const updatedChatsWithResponse = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatesMessagesWithResponse };
        }
        return chat;
      });
      setChats(updatedChatsWithResponse);
    }
  };

  const handleSelectChat = (id) => {
    setActiveChat(id);
  };

  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);

    if (id === activeChat) {
      const newActiveChats =
        updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChats);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatApp">
      <div className="chatList">
        <div className="chatListHeader">
          <h4>Chat List</h4>
          <i
            className="bx bx-edit-alt newChat"
            onClick={() => onNewChat("New Chat")}
          ></i>
        </div>
        {chats
          .slice()
          .reverse()
          .map((chat) => (
            <div
              key={chat.id}
              className={`chatListItem ${
                chat.id === activeChat ? "active" : ""
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <h5>{chat.displayId}</h5>
              <i
                className="bx bx-x-circle x"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(chat.id);
                }}
              ></i>
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
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "prompt" ? "prompt" : "response"}
            >
              {msg.text} <span>{msg.timestamp}</span>
            </div>
          ))}
          {isTyping && <div className="response">Typing...</div>}
          <div ref={chatEndRef}></div>
        </div>
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
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  );
};

export default ChatBotApp;

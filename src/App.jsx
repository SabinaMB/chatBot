import React, { useState } from "react";
import ChatBotStart from "./Components/chatBotStart";
import ChatBotApp from "./Components/ChatBotApp";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleStartChat = () => {
    setIsChatting(true);

    if (chats.length === 0) {
      createNewChat();
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  const createNewChat = (initialMessage = "") => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("de-DE");
    const formattedTime = now.toLocaleTimeString();

    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${formattedDate} ${formattedTime}`,
      messages: initialMessage
        ? [
            {
              type: "prompt",
              text: initialMessage,
              timestamp: formattedDate,
              formattedTime,
            },
          ]
        : [],
    };

    // setChats((prevChats) => [...prevChats, newChat]);
    // setActiveChat(newChat.id);

    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    setActiveChat(newChat.id);
  };

  return (
    <div className="container">
      {!isChatting ? (
        <ChatBotStart onStartChat={handleStartChat} />
      ) : (
        <ChatBotApp
          onGoBack={handleGoBack}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      )}
    </div>
  );
};

export default App;

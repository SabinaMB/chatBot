import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBotStart from "./Components/chatBotStart";
import ChatBotApp from "./Components/ChatBotApp";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(storedChats);
    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id);
    }
  }, []);

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

    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages));
    setActiveChat(newChat.id);
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {!isChatting ? (
          <motion.div
            key="chatStart"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <ChatBotStart onStartChat={handleStartChat} />
          </motion.div>
        ) : (
          <motion.div
            key="chatApp"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <ChatBotApp
              onGoBack={handleGoBack}
              chats={chats}
              setChats={setChats}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              onNewChat={createNewChat}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

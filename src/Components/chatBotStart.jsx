import React from "react";
import "./chatBotStart.css";
import botImage from "../assets/bot6.png";

const chatBotStart = ({ onStartChat }) => {
  return (
    <div className="startPage">
      <img src={botImage} alt="bot" className="botImage" />
      <button className="startButton" onClick={onStartChat}>
        Let's chat
      </button>
    </div>
  );
};

export default chatBotStart;

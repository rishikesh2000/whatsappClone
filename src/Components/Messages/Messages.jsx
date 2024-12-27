import React, { useEffect, useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";

const Messages = ({ senderID, receiverID }) => {
  const { getAllSenderChats, getAllReceiverChats, senderChat, receiverChat } = useContext(AuthContext);

  useEffect(() => {
    if (senderID && receiverID) {
        getAllSenderChats(senderID, receiverID);
        getAllReceiverChats(senderID, receiverID);
    }
  }, [senderID, receiverID, senderChat, receiverChat]);

  // Prepare chats from context
  const allChats = [
    ...(senderChat?.chats || []),
    ...(receiverChat?.chats || []),
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Group chats by date
  const groupedMessages = allChats.reduce((groups, msg) => {
    const messageDate = new Date(msg.createdAt).toLocaleDateString("en-GB");
    if (!groups[messageDate]) {
      groups[messageDate] = [];
    }
    groups[messageDate].push(msg);
    return groups;
  }, {});

  return (
    <div className="msg-container">
      {Object.keys(groupedMessages).map((date, index) => (
        <React.Fragment key={index}>
          {/* Date Header */}
          <div className="date-header">
            <span>{date === new Date().toLocaleDateString("en-GB") ? "Today" : date}</span>
          </div>

          {/* Messages for the Date */}
          {groupedMessages[date].map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === senderID ? "sender" : "receiver"}
            >
              <span>
                {msg.message}
                <span className="time">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </span>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Messages;

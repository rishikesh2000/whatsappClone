import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';
import userA from '../../Assets/userAvtar.png';
import db from "../../Config/InstandDBConfig";
import { id } from "@instantdb/react";
import Messages from '../Messages/Messages';
import MessageInpute from '../MessageInpute/MessageInpute';

const ChatWindow = ({ contact, userData }) => {


  const senderId = userData.currentUser.id;
  const receiverId =  contact.id?.toString()

  // const query1 = {
  //   chats: {
  //     $: {
  //       where: {    
  //         'sender': senderId,
  //         'receiver': receiverId,
  //       },
  //     },
  //   },
  // };
  // const { data:senderChat } =  db.useQuery(query1);


  // const query2 = {
  //   chats: {
  //     $: {
  //       where: {    
  //         'receiver':senderId ,
  //         'sender': receiverId,
  //       },
  //     },
  //   },
  // };
  // const { data:receiverChat} =  db.useQuery(query2);

// setMessages(data.chats);

  return (
    <div className="chatWindow-container">
      <div className="chatWindow-nav">
        <div className="chatWindow-userDetails">
          <img src={userA} alt="user-profile" title="Profile details" />
          <h3>{contact.name}</h3>
        </div>
        <div className="chatWindow-icons">
          <span className="mynaui--video-solid" title="Get the app for calling"></span>
          <span className="gg--search" title="Search..."></span>
          <span className="mage--dots" title="Menu"></span>
        </div>
      </div>

      <div className="chatWindow-chat">
    

        <div className="chatwindow-encymsg">
          <span className="chatwindow-encymsg-text">
            <span className="uis--lock"></span>
            Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
          </span>
        </div>

 {/* <div className="msg-container">
  {(() => {
    const allChats = [...(senderChat?.chats || []), ...(receiverChat?.chats || [])];
    allChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const groupedMessages = allChats.reduce((groups, msg) => {
      const messageDate = new Date(msg.createdAt).toLocaleDateString("en-GB"); 
      if (!groups[messageDate]) {
        groups[messageDate] = [];
      }
      groups[messageDate].push(msg);
      return groups;
    }, {});

    return Object.keys(groupedMessages).map((date, index) => (
      <React.Fragment key={index}>

        <div className="date-header">
          <span>{date === new Date().toLocaleDateString("en-GB") ? "Today" : date}</span>
        </div>

        {groupedMessages[date].map((msg) => (
          <div 
            key={msg.id} 
            className={msg.sender === senderId ? "sender" : "receiver"}
          >
               <span>
               {msg.message}
               <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
               </span>
            
          </div>
        ))}
      </React.Fragment>
    ));
  })()}
</div> */}

<div className='msg-container'>
  <Messages senderID ={senderId} receiverID = {receiverId}/>
</div>



      </div>

      <footer className="chatWindow-inpute-con">
        {/* <div className="inpute-con-items">
          <span className="ic--round-plus" title="Attach"></span>

          <div className="chatWindow-msg-con">
            <span
              className="mingcute--emoji-fill"
              title="Emoji"
              onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
            ></span>

            {isEmojiPickerOpen && (
              <div className="emoji-picker" ref={emojiPickerRef}>
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
              </div>
            )}

            <input
              className="msgInpute"
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>

          {newMessage.trim() === "" ? (
            <span className="material-symbols--mic-rounded"></span>
          ) : (
            <span className="material-symbols--send-rounded" onClick={sendMessage}></span>
          )}
        </div> */}
        <MessageInpute senderID ={senderId} receiverID = {receiverId}/>
      </footer>
    </div>
  );
};

export default ChatWindow;

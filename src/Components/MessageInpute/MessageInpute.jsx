import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import db from "../../Config/InstandDBConfig";
import { id } from "@instantdb/react";

const MessageInpute = ({senderID, receiverID}) => {
    const [newMessage, setNewMessage] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const emojiPickerRef = useRef(null);

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setIsEmojiPickerOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handleEmojiClick = (emoji) => {
        setNewMessage((prevMessage) => prevMessage + emoji.emoji);
      };

      const sendMessage = async () => {
        if (!newMessage.trim()) {
          return;
        }
    
        try {
            db.transact(db.tx.chats[id()].update({
            sender: senderID,
            receiver: receiverID,
            message: newMessage,
            done: true,
            createdAt: Date.now(),
          }));
    
          setNewMessage(""); 
        } catch (error) {
          // console.log(error);
          return error
        }
      };

  return (
       <div className="inpute-con-items">
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
              </div>
  )
}

export default MessageInpute

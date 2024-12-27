import React, { useState } from 'react';
import ContactList from '../Components/ContactList/ContactList';
import ChatWindow from '../Components/ChatWindow/ChatWindow';
import ChatWindowLanding from '../Components/ChatWindow/ChatWindowLanding';
import './ChatPage.css';

const userData = JSON.parse(localStorage.getItem("userData"));


const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };


  return (
    <div className='chat-container'>
      <div className='contactList-left'>
        <ContactList onContactClick={handleContactClick} userData ={userData} />
      </div>
      <div className='chatWindow-right'>
        {selectedContact ? (
          <ChatWindow contact={selectedContact} userData ={userData} />
        ) : (
          <ChatWindowLanding />
        )}
      </div>
    </div>
  );
};

export default ChatPage;

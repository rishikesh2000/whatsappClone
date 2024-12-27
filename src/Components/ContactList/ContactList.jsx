import React, { useState, useContext, useEffect, useMemo } from "react";
import "./ContactList.css";
import userA from "../../Assets/userAvtar.png";
import { AuthContext } from "../../Context/AuthContext";

const ContactList = ({ onContactClick, userData }) => {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const { getAllUsers, currentAllUser, receiverChat } = useContext(AuthContext);
  const loggedInUserId = userData.currentUser.id;
  

  useEffect(() => {
    getAllUsers();
  }, []);



  const handleContactClick = (contact) => {
    setSelectedContactId(contact.id);
    onContactClick(contact);
  };

  const handleProfileClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    return currentAllUser
      ?.filter((user) => user.id !== loggedInUserId) 
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [currentAllUser, searchTerm, loggedInUserId]);

  const loggedInUserData = JSON.parse(localStorage.getItem("userData"));
  const user = loggedInUserData?.currentUser;

  return (
    <div className="contactList-container">
      <div className="contactListHeader">
        <h2>Chats</h2>
        <div className="contactListHeaderIcon">
          <span className="iconoir--chat-plus-in" title="New Chat"></span>
          <span
            className="pepicons-pencil--dots-y"
            title="Profile"
            onClick={handleProfileClick}
          ></span>
        </div>
      </div>

      <div className="contactListHeader-2">
        <div className="contactListHeader-search">
          <span className="weui--search-outlined"></span>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search contacts"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="contactListHeader-categr">
          <span>All</span>
          <span>Unread</span>
          <span>Favorites</span>
          <span>Groups</span>
        </div>
      </div>

      <div className="contact-persone">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className={`contact-persone-details ${
                selectedContactId === user.id ? "selected" : ""
              }`}
              onClick={() => handleContactClick(user)}
            >
              <div className="userProfile">
                <img src={userA} alt={`${user.name}'s profile`} />
              </div>
              <div className="userNameD">
                <div className="userName">{user.name}</div>
                <span className="lastMessage">New messages yet</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-contacts">No contacts found</div>
        )}
      </div>

      {isPopupVisible && (
        <div className="profile-popup">
          <div className="profile-popup-content">
            <h2>Profile</h2>
            <span className="close-btn" onClick={closePopup}>
              X
            </span>
            <div className="profile-details">
              <div className="user-profileimg">
                <img src={userA} alt="User's profile" />
              </div>
              <div className="profileDetailsBox">
                <span>Your Name</span>
                <p>{user.name}</p>
              </div>
              <div className="profileDetailsBox">
                <span>Your Number</span>
                <p>{user.number}</p>
              </div>
              <div className="profileDetailsBox">
                <span>About</span>
                <p>{user.bio || "No bio available"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;

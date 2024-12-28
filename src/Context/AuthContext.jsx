import React, { createContext, useState, useEffect } from "react";
import db from "../Config/InstandDBConfig";
import { id } from "@instantdb/react";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [currentAllUser, setCurrentAllUser] = useState(null);

  const [senderChat, setSenderChat] = useState(null);
  const [receiverChat, setReciverChat] = useState(null);


  const [loginQuery, setLoginQuery] = useState(null); 
  const [allUserQuery, setAllUserQuery] =useState(null); 
  const [senderChatsQ, setSenderChatsQ] =useState(null); 
  const [recieverChatQ, setRecieverChatQ] =useState(null); 
  const [existingUserQ, setExistingUserQ] = useState(null);

  const {  data, isLoading } =  db.useQuery(loginQuery);

  const {  data: allData } =  db.useQuery(allUserQuery);

  const {  data: senderChatData } =  db.useQuery(senderChatsQ);

  const {  data: recieverChatData } =  db.useQuery(recieverChatQ);

  const {  data: existingUserD } =  db.useQuery(existingUserQ);

  const loginUser  = (number, password) => {
    try {
      const query = {
        users: {
          $: {
            where: {
              number,
              password,
            },
          },
        },
      };
    setLoginQuery(query);

    console.log(data)

    if (isLoading) {
      return { success: false };
    }

  if (data.users.length === 0) {
      return { success: false, message: "User Not Found Register Fisrt" };
  }
  
  if(data.users.length>=0){
    return { success: true, message: "Loging Successful" };
  }

    } catch (error) {
      return { success: false, message: "Login Error, Please Try Again" };

    }


};

useEffect(()=>{
  if(allData)
   setCurrentAllUser(allData.users)
},[allData])

useEffect(()=>{
 if(data)
  setCurrentUser(data.users[0])
},[data])

// useEffect(() => {
//   const fetchData = async () => {
//     const storedUser  = localStorage.getItem("loggedInUser ");
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   };

//   fetchData();
// }, []);



 
const registerUser = async (name, number, password) => {
  try {
    const query = {
      users: {
        $: {
          where: {
            number,
          },
        },
      },
    };

   await setExistingUserQ(query);
    console.log(existingUserD)

    if (existingUserD.users.length > 0) {
      return { success: false, message: "Number already exists" };
    }

    await db.transact(
      db.tx.users[id()].update({
        name: name,
        number: number,
        password: password,
        createdAt: Date.now(),
      })
    );

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return { success: false, message: "An error occurred", error };
  }
};



const getAllUsers = async ()=>{
  const query = {
    users: {
      $: {
        where: {},
      },
    },
  };

setAllUserQuery(query);


}


const getAllSenderChats = async (senderID, receiverID) => {
  const query = {
    chats: {
      $: {
        where: {
          sender: senderID,
          receiver: receiverID,
        },
      },
    },
  };

  setSenderChatsQ(query);
};

const getAllReceiverChats = async (senderID, receiverID) => {
  const query = {
    chats: {
      $: {
        where: {
          sender: receiverID,
          receiver: senderID,
        },
      },
    },
  };

  setRecieverChatQ(query);
};

useEffect(() => {
  if (senderChatData) {
    setSenderChat(senderChatData);
  }
}, [senderChatData]); 

useEffect(() => {
  if (recieverChatData) {
    setReciverChat(recieverChatData);
  }
}, [recieverChatData]); 


  return (
    <AuthContext.Provider value={{  registerUser, loginUser, currentUser,getAllUsers, currentAllUser, isLoading, getAllSenderChats, getAllReceiverChats, senderChat, receiverChat }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isUser = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // Redirect to login if the user is not logged in
    if (!isUser || isUser.loggedIn === false) {
      navigate("/");
    }
  }, [isUser, navigate]);

  // Render children if the user is authenticated
  return isUser && isUser.loggedIn ? children : null;
};

export default ProtectedRoute;

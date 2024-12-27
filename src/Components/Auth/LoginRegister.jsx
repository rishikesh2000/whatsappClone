import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import db from "../../Config/InstandDBConfig";




const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const number = parseInt(phoneNumber);

  const { registerUser, loginUser, error, currentUser,isLoading } = useContext(AuthContext);

  const handleSubmit = async (e, currectUSer) => {
    e.preventDefault();


    if (!number || !password || (!isLogin && !name)) {
      alert("Please fill in all fields!");
      return;
    }

    if (isLogin) {
      loginUser(number, password);

    } else {

      const res = await registerUser(name, number, password);
      if (res) {
        alert("Registration successful!");
        setIsLogin(true);
      }


    }
  };

  useEffect(() => {
    if (currentUser) {
      alert("login successful");
      localStorage.setItem("userData", JSON.stringify({
        loggedIn: true,
        currentUser
      }));

      navigate('/chat');
    }
  }, [currentUser])


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setName("");
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login to WhatsApp" : "Register for WhatsApp"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="text"
              id="number"
              placeholder="Phone Number"
              className="input-field"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="secretKey"
              placeholder="Secret Key"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="toggle-text" onClick={toggleForm}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;

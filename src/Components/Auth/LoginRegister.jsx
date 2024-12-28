import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const number = parseInt(phoneNumber);

  const { registerUser, loginUser, currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!number || !password || (!isLogin && !name)) {
      toast.info("Please fill in all fields!");
      return;
    } else if (!/^\d{10}$/.test(number)) { 
      toast.info("Number must be exactly 10 digits");
      return;
    }
 
    if (isLogin) {
     const res = await loginUser(number, password);

     if(res.success===true){
      toast.success(`${res.message}`);
      localStorage.setItem("userData", JSON.stringify({
        loggedIn: true,
        currentUser
      }));
      navigate('/chat');
    }
      else {
        toast.error(`${res.message}`);
      }
   
    } else {
       const res = await registerUser(name, number, password);

if(res.success===true){
  toast.success(`${res.message}`);
        setIsLogin(true);
}else{
  toast.error(`${res.message}`);
  setIsLogin(false);
}

    }
  };

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

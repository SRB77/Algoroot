/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleSignin() {
    setError(""); // Clear previous errors
    console.log(localStorage);
    // Get all stored users from localStorage
      let foundUser = null;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData.email === email) {
            foundUser = userData;
            break;
          }
        }
      }

      // Check if user exists
      if (!foundUser) {
        setError("No account found with this email.");
        return;
      }

      // Check if password matches
      if (foundUser.password !== password) {
        setError("Incorrect password. Try again.");
        return;
      }
      alert("Sign-in successful!");
      setEmail("");
      setPassword("");
      navigate('/Details');
  }
  return (
    <>
      <div className="main">
        <div className="Signinform">
          <h1>SignIN</h1>
          <input
            type="Email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={handleSignin}>Get Started</button>
        </div>
      </div>
    </>
  );
}

export default Signin;

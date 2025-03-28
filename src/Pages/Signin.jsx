/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // Import bcryptjs
import {toast} from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignin() {
    let foundUser = null;
    let foundUserId = null;

    // Loop through localStorage to find the user
    for (let key in localStorage) {
      if (
        localStorage.hasOwnProperty(key) &&
        key !== "isAuthenticated" &&
        key !== "currentUser"
      ) {
        const userData = JSON.parse(localStorage.getItem(key));
        if (userData.email === email) {
          foundUser = userData;
          foundUserId = key;
          break;
        }
      }
    }

    // Check if user exists
    if (!foundUser) {
      toast.error("No account found with this email.");
      return ; 
    }

    // **Compare Entered Password with Hashed Password**
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      toast.error("Incorrect password. Try again.");
      return;
    }

    // Set session data
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", foundUserId);

    toast.success("Sign-in successful!");

    // Clear input fields
    setEmail("");
    setPassword("");

    // Navigate to Details Page
    navigate("/Details");
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
          <p className="para" onClick={()=>{
            navigate('/Signup')
          }}>create an account</p>
        </div>
      </div>
    </>
  );
}

export default Signin;

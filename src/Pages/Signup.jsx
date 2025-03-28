/* eslint-disable no-unused-vars */
import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  //Functionalities :
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&]/.test(password)
    );
  };
  const handleSignup = () => {
    setError(""); // Clear previous errors

    //Email validation
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      console.log(error);
      return;
    }

    //Password match check
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      console.log(error);
      return;
    }

    //Strong password check
    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      console.log(error);
      return;
    }

    // Store user data in localStorage
    const userData = { email, password };
    localStorage.setItem(Date.now(), JSON.stringify(userData));
    // clear value from input Field
    setEmail("");
    setPassword("");
    setConfirmpassword("");
    navigate("/Details");
  };

  return (
    <>
      <div className="main">
        <div className="SignUpform">
          <h1>SignUp</h1>
          <p>Signup to continue</p>
          <input
            type="Email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="Password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <button onClick={handleSignup}>Create Account</button>
        </div>
      </div>
    </>
  );
}

export default Signup;

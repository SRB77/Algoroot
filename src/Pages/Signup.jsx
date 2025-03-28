import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

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

const handleSignup = async () => {

  // Email validation
  if (!isValidEmail(email)) {
    toast.error("Invalid email format");
    return;
  }

  // Password match check
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return;
  }

  // Strong password check
  if (!isStrongPassword(password)) {
    toast.error(
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
    );
    return;
  }

  // Generate a unique user ID
  const userId = Date.now().toString();

  // **Hash Password Before Storing**
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

  // Store user data in localStorage
  const userData = { email, password: hashedPassword };
  localStorage.setItem(userId, JSON.stringify(userData));

  // Set authentication session
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("currentUser", userId);

  // Clear input fields
  setEmail("");
  setPassword("");
  setConfirmpassword("");
  
  // Navigate to Details Page
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

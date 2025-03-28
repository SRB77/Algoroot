/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css';
import { useState } from 'react'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  function handleCreation(){
    navigate('/Signup');
  }
  function handleStart(){
    navigate('/Signin');
  }
  return (
    <>
    <div className="welcome-card">
      <h1>Welcome to Algo root</h1>
      <button onClick={handleCreation}>Create Account</button>
      <button onClick={handleStart}>Get Started</button>
    </div>
    </>
  )
}

export default App
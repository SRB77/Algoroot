import React from 'react'
import './Signin.css'
function Signin() {
  return (
    <>
    <div className="main">
        <div className="Signinform">
            <h1>SignIN</h1>
            <input type="Email" placeholder='Enter Emai;'/>
            <input type="password" placeholder='Enter Password'/>
            <button>Get Started</button>
        </div>
    </div>
    </>
  )
}

export default Signin
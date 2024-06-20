// Login screen with username / password form, and also link to Register page below (e.g. New to DAT Music? Create an account here)
// Accessible in nav (if not logged in) and when user clicks "Add to cart"

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import any other dependent files here (ex. checkout)

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    
    })

    const data = await response.json();
    console.log("Response data on Login:", data);

    if (response.ok) {
              localStorage.setItem('token', data.token);
              setToken(data.token);
              console.log ("Successfully Logged In!", data.token)
              setSuccessMessage(data.message);
              setUsername("");
              setPassword("");
    } else {
          setError(data.message || "Login failed");
    }
    } catch (err) {
          setError(err.message);
    }
  }


  return (
    <div className = "Login">
    <form className = "login-form" onSubmit={handleSubmit}>
      <h2> Login To Your DAT Music Account </h2>
      <h3>Enter your Username</h3>
    <input type = "username" value = {username} onChange={(e)=> setUsername(e.target.value)} placeholder={"Enter Your Username"} />
    <h3>Enter Password</h3>
    <input type = "password" value = {password} onChange={(e)=> setPassword(e.target.value)} placeholder={"Password"} />
    <br></br>
    <button type = "submit">Login to DAT Music</button>
    </form>
    </div> 
    );
}

export default Login;

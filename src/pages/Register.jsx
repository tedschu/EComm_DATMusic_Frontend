// Account creation / register page.

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import any other dependent files here (ex. checkout)

function Register() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState(""); 
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  async function handleSubmit(e) {
      const [error, setError] = useState("");
      
      e.preventDefault(); 
      // console.log(typeof password)
      try {
      const response = await fetch (
          "http://localhost:8080/api/users/register",{
              method: "POST",
              // headers: {
              //     "Content-Type": "application/json"
              // },
              body: JSON.stringify({
                  firstname: "drew", 
                  lastname: "smith",
                  address: "1000 SuperCool Street",
                  username: "drewsmithyy", 
                  password: "password", 
              })
          })
      
      const data = await response.json(); 
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setSuccessMessage(data.message);
      console.log(data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
          
      } catch (err) {
          setError(err.message)
      }
  }
  
      console.log("TOKEN: ", token);
  
  
      return (
          <div className="Register">
              <form className = "register-form" onSubmit={handleSubmit}>
                  <h3> Welcome! Please Fill Out The Below Fields to Register To DAT Music. </h3> 
              <input value = {firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder={"First Name ...."} />
              <br></br>
              <input value = {lastname} onChange={(e)=>setLastName(e.target.value)} placeholder={"Last Name ...."} />
              <br></br>
              <input value = {address} onChange={(e)=> setAddress(e.target.value)} placeholder={"Enter Your Shipping Address"} />
              <br></br>
              <input value = {username} onChange={(e)=> setUsername(e.target.value)} placeholder={"Enter Your Desired Username"} />
              <br></br>
              <input type = "password" value = {password} onChange={(e)=> setPassword(e.target.value)} placeholder={"Password"} />
              <br></br>
              <button type = "submit"> Submit </button>
              <button onClick={() => {localStorage.removeItem("token"); }}> Log Out </button>
              </form>
              
          </div>
      )
  }
  
  
  export default Register; 

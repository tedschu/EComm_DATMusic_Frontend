import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          address,
          username,
          password,
        }),
      });


      const data = await response.json();
      console.log(data)
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setSuccessMessage(data.message);
        setFirstName("");
        setLastName("");
        setAddress("");
        setUsername("");
        setPassword("");
        navigate('/login', { state: { registrationSuccessMessage: 'Successfully Registered' } });

      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  

  return (
    <div className="Register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Welcome! Please Fill Out The Below Fields to Register To DAT Music.</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <input
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name ...."
        />
        <br />
        <input
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name ...."
        />
        <br />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Your Shipping Address"
        />
        <br />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Desired Username"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button type="submit">Submit</button>
        <button onClick={() => localStorage.removeItem("token")}>Log Out</button>
      </form>
    </div>
  );
}

export default Register;
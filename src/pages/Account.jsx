// Shows user account info from "users" DB table: name, address, etc.
// Should only be accessible if logged in or registered (eventually)

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import any other dependent files here (ex. checkout)

function Account({isLoggedIn}) {

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 

  useEffect(()=> {
    if (token) {
      fetchUserData(); 
    } else {
      setError("User is not authenticated, thus we can not verify user information.");
    }
  }) , [token];

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/me', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
          const data = await response.json();
          setUserData(data);
      } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch user data");
      }
  } catch (err) {
      setError(err.message);
  }
};

// reloads the page after logging out 
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

if (!token) {
  return <div className="please-login">
          <Link to={"/login"}>Please Login to DAT Music to View Account Information</Link>
        </div>
        ;
}

return (
  <div className="Account">
      <h2>Your Account Information</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
          <div>
              <p><strong>First Name:</strong> {userData.first_name}</p>
              <p><strong>Last Name:</strong> {userData.last_name}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <p><strong>Username:</strong> {userData.username}</p>
              <button onClick={handleLogout}>Log Out</button>
          </div>
      ) : (
          <p>Loading...</p>
      )}
  </div>
);
}


export default Account;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminProfile.css';

function AdminProfile({ adminUsername }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const adminId = loggedInAdmin?.adminId || loggedInAdmin?.id || null; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/admins/${adminId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(password)
      });
      if (res.ok) {
        setMessage("Password updated successfully");
        setPassword("");
      } else {
        const errText = await res.text();
        setMessage(errText || "Failed to update password");
      }
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <div className="admin-profile-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Dashboard</button>
      <h2>{adminUsername}'s Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminProfile;

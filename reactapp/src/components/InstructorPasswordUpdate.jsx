import React, { useState } from "react";

function InstructorPasswordUpdate({ instructor }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        `http://localhost:8080/instructor/updatePassword/${instructor.instructorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );
      if (res.ok) {
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errText = await res.text();
        setMessage(errText || "Failed to update password.");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-update-section">
      <h2>Change Password</h2>
      {message && (
        <p className={message.includes("success") ? "success-message" : "error-message"}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        </label>
        <label>
          Confirm New Password:
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default InstructorPasswordUpdate;

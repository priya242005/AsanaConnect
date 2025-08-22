import React, { useState } from "react";

function NewSessionSection({ instructorId, refreshSessions }) {
  const [sessionName, setSessionName] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Current date in yyyy-MM-dd format for date input min attribute
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];

  // Current time in HH:mm format for time input min attribute
  const currentTime = now.toTimeString().slice(0, 5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!sessionName || !sessionDate || !sessionTime || !durationMinutes) {
      setMessage("Please fill in all mandatory fields.");
      return;
    }

    if (durationMinutes < 1 || durationMinutes > 60) {
      setMessage("Duration must be between 1 and 60 minutes.");
      return;
    }

    // Combine date and time into a Date object
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}`);

    if (sessionDateTime < now) {
      setMessage("Session date and time must be in the future.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/instructors/${instructorId}/sessions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionName,
          sessionTime: sessionDateTime.toISOString(),
          durationMinutes: parseInt(durationMinutes, 10),
        }),
      });

      if (response.ok) {
        setMessage("Session created successfully!");
        setSessionName("");
        setSessionDate("");
        setSessionTime("");
        setDurationMinutes("");
        if (refreshSessions) refreshSessions();
      } else {
        const errorText = await response.text();
        setMessage("Error: " + errorText);
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-session-container">
      <h2>Create New Session</h2>
      <form onSubmit={handleSubmit} className="new-session-form">
        <label>
          Session Name <span style={{ color: "red" }}>*</span>:
          <input
            type="text"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            required
          />
        </label>

        <label>
          Session Date <span style={{ color: "red" }}>*</span>:
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            min={currentDate}
            required
          />
        </label>

        <label>
          Session Time <span style={{ color: "red" }}>*</span>:
          <input
            type="time"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
            required
            min={sessionDate === currentDate ? currentTime : undefined}
          />
        </label>

        <label>
          Duration (minutes) <span style={{ color: "red" }}>*</span>:
          <input
            type="number"
            min="1"
            max="60"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Session"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default NewSessionSection;

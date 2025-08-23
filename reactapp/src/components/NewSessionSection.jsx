import React, { useState } from "react";

function NewSessionSection({ instructorId, refreshSessions }) {
  const [sessionName, setSessionName] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [slots, setSlots] = useState("");
  const [emotion, setEmotion] = useState("happy"); // default emotion
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const emotions = ["happy", "sad", "excited", "relaxed", "angry"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!sessionName || !sessionDate || !sessionTime || !durationMinutes || !slots) {
      setMessage("Please fill in all mandatory fields.");
      return;
    }

    if (durationMinutes < 1 || durationMinutes > 60) {
      setMessage("Duration must be between 1 and 60 minutes.");
      return;
    }

    if (slots < 1) {
      setMessage("Slots must be at least 1.");
      return;
    }

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
          slots: parseInt(slots, 10),
          emotion,
        }),
      });

      if (response.ok) {
        setMessage("Session created successfully!");
        setSessionName("");
        setSessionDate("");
        setSessionTime("");
        setDurationMinutes("");
        setSlots("");
        setEmotion("happy");
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

        <label>
          Slots <span style={{ color: "red" }}>*</span>:
          <input
            type="number"
            min="1"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            required
          />
        </label>

        <label>
          Emotion <span style={{ color: "red" }}>*</span>:
          <select value={emotion} onChange={(e) => setEmotion(e.target.value)} required>
            {emotions.map((emo) => (
              <option key={emo} value={emo}>
                {emo.charAt(0).toUpperCase() + emo.slice(1)}
              </option>
            ))}
          </select>
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

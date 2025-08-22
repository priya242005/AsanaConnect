import React, { useEffect, useState } from "react";

function SessionsSection({ sessions, refreshSessions }) {
  const [bookingCounts, setBookingCounts] = useState({});

  useEffect(() => {
    async function fetchBookingCounts() {
      const counts = {};
      await Promise.all(
        sessions.map(async (session) => {
          try {
            const res = await fetch(`http://localhost:8080/bookings/count/session/${session.sessionId}`);
            if (res.ok) {
              const count = await res.json();
              counts[session.sessionId] = count;
            } else {
              counts[session.sessionId] = 0;
            }
          } catch {
            counts[session.sessionId] = 0;
          }
        })
      );
      setBookingCounts(counts);
    }

    if (sessions.length > 0) {
      fetchBookingCounts();
    }
  }, [sessions]);

  const handleDelete = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      const res = await fetch(`http://localhost:8080/instructors/sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Session deleted successfully.");
        if (refreshSessions) refreshSessions();
      } else {
        const msg = await res.text();
        alert("Failed to delete session: " + msg);
      }
    } catch (error) {
      alert("Network error, could not delete session.");
    }
  };

  if (sessions.length === 0) {
    return <p>You have no sessions created yet.</p>;
  }

  return (
    <div className="sessions-list">
      <h2>Your Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.sessionId} className="session-item">
            <h3>{session.sessionName}</h3>
            <p><strong>• Time:</strong> {new Date(session.sessionTime).toLocaleString()}</p>
            <p><strong>• Duration:</strong> {session.durationMinutes} minutes</p>
            {session.meetingLink && (
              <p>
                <strong>• Meeting Link:</strong>{" "}
                <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">Join Session</a>
              </p>
            )}
            <p><strong>• Users Booked:</strong> {bookingCounts[session.sessionId] ?? "Loading..."}</p>
            <button onClick={() => handleDelete(session.sessionId)} className="delete-btn">
              Delete Session
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionsSection;

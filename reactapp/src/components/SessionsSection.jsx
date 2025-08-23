import React, { useEffect, useState } from "react";

function SessionsSection({ sessions, refreshSessions }) {
  const [bookingCounts, setBookingCounts] = useState({});

  useEffect(() => {
    async function fetchBookingCounts() {
      const counts = {};
      await Promise.all(
        sessions.map(async (session) => {
          try {
            const res = await fetch(
              `http://localhost:8080/bookings/count/session/${session.sessionId}`
            );
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
      const res = await fetch(
        `http://localhost:8080/instructors/sessions/${sessionId}`,
        { method: "DELETE" }
      );
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 28,
        justifyContent: "start",
        width: "100%",
      }}
    >
      {sessions.map((session) => {
        const bookedCount = bookingCounts[session.sessionId] ?? 0;
        const allSlotsFilled = bookedCount >= session.slots;

        return (
          <div
            key={session.sessionId}
            style={{
              position: "relative",
              borderRadius: 18,
              overflow: "hidden",
              background: "#e3f2fd",
              boxShadow:
                "0 4px 22px 0 rgba(37,99,235,0.10), 0 2px 8px 0 rgba(0,0,0,0.08)",
              width: 260,
              minHeight: 360,
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              color: "#18181b",
              paddingBottom: 16,
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/261/144/non_2x/woman-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax-recreation-healthy-lifestyle-illustration-in-flat-cartoon-style-free-vector.jpg"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.20,
                zIndex: 0,
              }}
              draggable={false}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                padding: 24,
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: "bold",
                  margin: 0,
                  marginBottom: 4,
                  color: "#161742",
                }}
              >
                {session.sessionName}
              </h3>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.98rem" }}>
                <strong>Date:</strong> {new Date(session.sessionTime).toLocaleDateString()}
              </p>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.98rem" }}>
                <strong>Time:</strong>{" "}
                {new Date(session.sessionTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.98rem" }}>
                <strong>Duration:</strong> {session.durationMinutes} min
              </p>
              <p style={{ margin: "4px 0", fontWeight: 600, fontSize: "0.98rem", color: "#2563eb" }}>
                <strong>Emotion:</strong> {session.emotion?.charAt(0).toUpperCase() + session.emotion?.slice(1) || "N/A"}
              </p>
              <p style={{ margin: "4px 0", fontWeight: 600, fontSize: "0.98rem" }}>
                <strong>Slots:</strong> {session.slots ?? "N/A"}
              </p>
              {session.meetingLink && (
                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "0.98rem",
                    color: "#2563eb",
                  }}
                >
                  <span>Meeting Link:</span>{" "}
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#2563eb",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    Link
                  </a>
                </p>
              )}
              <p style={{ margin: "8px 0 0 0", fontWeight: 600, color: "#2563eb" }}>
                <strong>Users Booked:</strong> {bookedCount}
              </p>

              {allSlotsFilled && (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginTop: 12,
                  }}
                >
                  All slots are filled
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 20,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px 0",
                    borderRadius: 8,
                    fontWeight: "bold",
                    fontSize: "0.97rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    boxShadow: "0 2px 9px #ef44447c",
                    minWidth: 0,
                  }}
                  onClick={() => handleDelete(session.sessionId)}
                >
                  Delete Session
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SessionsSection;

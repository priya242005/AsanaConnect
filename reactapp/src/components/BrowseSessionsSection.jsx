import React from "react";

function BrowseSessionsSection({
  sessions,
  searchTerm,
  setSearchTerm,
  bookSession,
  bookedSessionIds,
  bookingStatus,
}) {
  if (!Array.isArray(sessions)) sessions = [];

  return (
    <div>
      <input
        type="search"
        placeholder="Search sessions by name or date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          maxWidth: 400,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      {sessions.length === 0 ? (
        <p>No sessions available.</p>
      ) : (
        <div className="sessions-list">
          {sessions.map((session) => {
            const status = bookingStatus[session.sessionId];
            const isBooked = bookedSessionIds.has(session.sessionId);
            const isBooking = status === "booking";

            let dateStr = "TBD";
            let timeStr = "TBD";
            if (session.sessionTime) {
              try {
                const dt = new Date(session.sessionTime);
                dateStr = dt.toLocaleDateString();
                timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              } catch {
                dateStr = "Invalid Date";
                timeStr = "Invalid Time";
              }
            }

            return (
              <div key={session.sessionId} className="session-item">
                <h3>{session.sessionName}</h3>
                <p><strong>Date:</strong> {dateStr}</p>
                <p><strong>Time:</strong> {timeStr}</p>
                <p>
                  <strong>Meeting Link: </strong>
                  {session.meetingLink 
                    ? <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">{session.meetingLink}</a>
                    : "Not available"
                  }
                </p>

                <button
                  disabled={isBooked || isBooking}
                  style={{
                    marginTop: 10,
                    backgroundColor: isBooked ? "#999" : "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: 6,
                    cursor: isBooked ? "not-allowed" : "pointer",
                  }}
                  onClick={() => bookSession(session.sessionId)}
                >
                  {isBooked
                    ? "Already Booked"
                    : isBooking
                    ? "Booking..."
                    : "Book Session"}
                </button>

                {status === "error" && (
                  <p style={{ color: "red", marginTop: 6 }}>
                    Booking failed, please try again.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BrowseSessionsSection;

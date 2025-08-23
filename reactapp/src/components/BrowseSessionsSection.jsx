import React, { useState } from "react";

const bgImageUrl =
  "https://static.vecteezy.com/system/resources/previews/004/261/144/non_2x/woman-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax-recreation-healthy-lifestyle-illustration-in-flat-cartoon-style-free-vector.jpg";

const emotions = ["happy", "sad", "excited", "relaxed", "angry"];

function BrowseSessionsSection({
  sessions,
  searchTerm,
  setSearchTerm,
  bookSession,
  bookedSessions,
  bookingStatus,
}) {
  if (!Array.isArray(sessions)) sessions = [];
  if (!Array.isArray(bookedSessions)) bookedSessions = [];

  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState("");

  const bookedSessionIds = new Set(
    bookedSessions
      .map((b) => b.session?.sessionId)
      .filter(Boolean)
      .map(String)
  );

  // Filter sessions: exclude booked, filter by emotion if selected, ensure slots available, and match search
  const availableSessions = sessions.filter((session) => {
    const sessionIdStr = String(session.sessionId);
    const isBooked = bookedSessionIds.has(sessionIdStr);
    const usersBooked = session.bookings ? session.bookings.length : 0;
    const hasSlots = session.slots ? usersBooked < session.slots : true;
    const matchEmotion = selectedEmotion ? session.emotion === selectedEmotion : true;
    const matchSearch =
      !searchTerm ||
      session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.sessionTime &&
        new Date(session.sessionTime)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return !isBooked && hasSlots && matchEmotion && matchSearch;
  });

  const sampleVideos = [
    "https://www.youtube.com/embed/yqeirBfn2j4?si=fuIajFtJf8pklhny",
    "https://www.youtube.com/embed/GTVvhMPSoE8?si=gKV7DU0vXzITahtj",
    "https://www.youtube.com/embed/I77hh5I69gA?si=Hbv_34ryobu4Wt2G",
    "https://www.youtube.com/embed/EvMTrP8eRvM?si=5xIV3qEr1S6j-i1K",
  ];

  const sessionsWithVideos = availableSessions.map((session) => ({
    ...session,
    videoUrl: sampleVideos[Math.floor(Math.random() * sampleVideos.length)],
  }));

  const openVideoModal = (url) => setVideoModalUrl(url);
  const closeVideoModal = () => setVideoModalUrl(null);

  return (
    <div>
      {/* Filter container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          margin: "20px 0 30px 0",
          background: "#ffffff",
          boxShadow: "0 4px 18px 0 rgba(37,99,235,0.04)",
          borderRadius: "16px",
          padding: "16px 18px",
          maxWidth: 650,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Emotion filter */}
        <select
          value={selectedEmotion}
          onChange={(e) => setSelectedEmotion(e.target.value)}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1.5px solid #2563eb",
            fontWeight: 600,
            color: "#2563eb",
            background: "#f5faff",
            outlineColor: "#2563eb",
            fontSize: "1.04rem",
            minWidth: 150,
          }}
        >
          <option value="">All Emotions</option>
          {emotions.map((emo) => (
            <option key={emo} value={emo}>
              {emo.charAt(0).toUpperCase() + emo.slice(1)}
            </option>
          ))}
        </select>

        {/* Search input */}
        <input
          type="search"
          placeholder="Search sessions by name or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1.5px solid #2563eb",
            fontWeight: 600,
            color: "#2563eb",
            background: "#f5faff",
            outlineColor: "#2563eb",
            fontSize: "1.04rem",
            flex: 1,
            minWidth: 180,
          }}
        />
      </div>

      {sessionsWithVideos.length === 0 ? (
        <p style={{ color: "#2563eb", fontWeight: "600" }}>No sessions available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px",
            justifyContent: "start",
            width: "100%",
          }}
        >
          {sessionsWithVideos.map((session) => {
            const status = bookingStatus[session.sessionId];
            const isBooking = status === "booking";

            let dateStr = "TBD";
            let timeStr = "TBD";
            if (session.sessionTime) {
              try {
                const dt = new Date(session.sessionTime);
                dateStr = dt.toLocaleDateString();
                timeStr = dt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              } catch {
                dateStr = "Invalid Date";
                timeStr = "Invalid Time";
              }
            }

            return (
              <div
                key={session.sessionId}
                style={{
                  position: "relative",
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "#e3f2fd",
                  boxShadow:
                    "0 4px 22px 0 rgba(37,99,235,0.10), 0 2px 8px 0 rgba(0,0,0,0.10)",
                  width: 260,
                  minHeight: 320,
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transition: "transform 0.18s, box-shadow 0.18s",
                }}
              >
                <img
                  src={bgImageUrl}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.22,
                    zIndex: 0,
                  }}
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
                    color: "#18181b",
                  }}
                >
                  <div style={{ marginBottom: "auto" }}>
                    <h3
                      style={{
                        fontSize: "1.23rem",
                        fontWeight: "bold",
                        margin: 0,
                        marginBottom: 8,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {session.sessionName}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: "1.4",
                      }}
                    >
                      <strong>Date:</strong> {dateStr}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: "1.4",
                      }}
                    >
                      <strong>Time:</strong> {timeStr}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: "1.4",
                      }}
                    >
                      <strong>Duration:</strong> {session.durationMinutes} min
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: "1.4",
                        color: "#2563eb",
                      }}
                    >
                      <strong>Emotion:</strong>{" "}
                      {session.emotion
                        ? session.emotion.charAt(0).toUpperCase() + session.emotion.slice(1)
                        : "N/A"}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: "1.4",
                      }}
                    >
                      <strong>Slots:</strong> {session.slots ?? "N/A"}
                    </p>
                    {session.meetingLink && (
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          lineHeight: "1.4",
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
                            textDecoration: "underline",
                            fontWeight: 700,
                          }}
                        >
                          Link
                        </a>
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 16,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => openVideoModal(session.videoUrl)}
                      style={{
                        flex: 1,
                        background:
                          "linear-gradient(90deg, #10b981 18%, #38bdf8 100%)",
                        color: "white",
                        border: "none",
                        padding: "10px 0",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "0.97rem",
                        boxShadow: "0 2px 8px #14b8a67d",
                        transition: "background 0.22s",
                        minWidth: 0,
                      }}
                    >
                      ▶ Watch Video
                    </button>

                    <button
                      disabled={isBooking}
                      onClick={() => bookSession(session.sessionId)}
                      style={{
                        flex: 1,
                        background:
                          "linear-gradient(90deg,#2563eb 70%,#38bdf8 100%)",
                        color: "white",
                        border: "none",
                        padding: "10px 0",
                        borderRadius: 8,
                        cursor: isBooking ? "not-allowed" : "pointer",
                        fontWeight: 700,
                        fontSize: "0.97rem",
                        boxShadow: "0 2px 9px #2563eb7c",
                        transition: "background 0.22s",
                        minWidth: 0,
                      }}
                    >
                      {isBooking ? "Booking..." : "Book Session"}
                    </button>
                  </div>
                  {status === "error" && (
                    <p
                      style={{
                        color: "#f87171",
                        margin: "10px 0 0 0",
                        fontWeight: 600,
                      }}
                    >
                      Booking failed, please try again.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {videoModalUrl && (
        <div
          className="video-modal-backdrop"
          onClick={closeVideoModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 860,
              backgroundColor: "#000",
              borderRadius: 12,
              boxShadow: "0 0 30px #0bc9d3",
              overflow: "hidden",
            }}
          >
            <iframe
              width="100%"
              height="480"
              src={videoModalUrl}
              title="Session Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={closeVideoModal}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                backgroundColor: "#0bc9d3",
                border: "none",
                borderRadius: "50%",
                width: 34,
                height: 34,
                color: "white",
                fontWeight: "700",
                fontSize: 26,
                cursor: "pointer",
                boxShadow: "0 0 12px #0bc9d3",
                lineHeight: "32px",
                padding: 0,
              }}
              aria-label="Close video"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowseSessionsSection;

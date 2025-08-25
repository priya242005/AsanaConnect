import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserDashboard.css";
import BrowseSessionsSection from "./BrowseSessionsSection";
import UserProfileSection from "./UserProfileSection";
import PasswordUpdateSection from "./PasswordUpdateSection";
import FeedbackForm from "./FeedbackForm";

function Footer() {
  return (
    <div style={{ marginTop: "auto" }}>
      <footer
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "1rem",
          textAlign: "center",
          fontSize: "0.9rem",
          fontWeight: "500",
          width: "100%",
        }}
      >
        <small>© 2024 Yoga Instructor Application. All rights reserved.</small>
      </footer>
    </div>
  );
}

function UserDashboard({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("welcome");
  const [user, setUser] = useState(loggedInUser);
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingStatus, setBookingStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [feedbacks, setFeedbacks] = useState({}); 
  const [feedbackFormSessionId, setFeedbackFormSessionId] = useState(null);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/user/login");
      return;
    }
    setUser(loggedInUser);
    fetchSessions();
    fetchBookings(loggedInUser.userId);
    fetchUserFeedbacks(loggedInUser.userId);
  }, [location.state, loggedInUser, navigate]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchSessions();
    } else {
      const lower = searchTerm.toLowerCase();
      setSessions((prevSessions) =>
        prevSessions.filter(
          (s) =>
            s.sessionName.toLowerCase().includes(lower) ||
            (s.instructor?.name || "").toLowerCase().includes(lower) ||
            new Date(s.sessionDate).toLocaleDateString().toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm]);

  async function fetchSessions() {
    try {
      const res = await fetch("http://localhost:8080/sessions");
      const data = await res.json();
      setSessions(data);
    } catch {
      alert("Error fetching sessions");
    }
  }

  async function fetchBookings(userId) {
    try {
      const res = await fetch(`http://localhost:8080/bookings/user/${userId}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      alert("Error fetching bookings");
    }
  }

  async function fetchUserFeedbacks(userId) {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:8080/feedback/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      const feedbackBySession = {};
      data.forEach((fb) => {
        if (fb.session && fb.session.sessionId) {
          feedbackBySession[fb.session.sessionId] = fb;
        }
      });
      setFeedbacks(feedbackBySession);
    } catch {
     
    }
  }

  async function bookSession(sessionId) {
    if (!user) {
      alert("Login required to book");
      return;
    }

    setBookingStatus((prev) => ({ ...prev, [sessionId]: "booking" }));

    try {
      const res = await fetch(
        `http://localhost:8080/bookings/book?userId=${user.userId}&sessionId=${sessionId}`,
        { method: "POST" }
      );
      if (!res.ok) {
        const msg = await res.text();
        alert(`Booking failed: ${msg}`);
        setBookingStatus((prev) => ({ ...prev, [sessionId]: "error" }));
      } else {
        alert("Booking successful!");
        fetchBookings(user.userId);
        setBookingStatus((prev) => ({ ...prev, [sessionId]: "booked" }));
      }
    } catch {
      alert("Network error during booking.");
      setBookingStatus((prev) => ({ ...prev, [sessionId]: "error" }));
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  };

  const openFeedbackForm = (sessionId) => {
    setFeedbackFormSessionId(sessionId);
  };

  const closeFeedbackForm = () => {
    setFeedbackFormSessionId(null);
  };

  const onFeedbackSubmitted = () => {
    fetchUserFeedbacks(user.userId);
  };

  const menuItems = [
    { id: "welcome", label: "Welcome" },
    { id: "browseSessions", label: "Browse Sessions" },
    { id: "bookings", label: "Bookings" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Change Password" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="instructor-dashboard-wrapper" style={{ flexGrow: 1, display: "flex" }}>
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <Navbar userName={user?.name} onLogout={handleLogout} />

          <section className="content-section">
            {activeSection === "welcome" && <WelcomeSection user={user} bookings={bookings} />}
            {activeSection === "browseSessions" && (
              <BrowseSessionsSection
                sessions={sessions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                bookSession={bookSession}
                bookedSessions={bookings}
                bookingStatus={bookingStatus}
              />
            )}
            {activeSection === "bookings" && (
              <BookingsSection
                bookings={bookings}
                feedbacks={feedbacks}
                openFeedbackForm={openFeedbackForm}
              />
            )}
            {activeSection === "profile" && <UserProfileSection user={user} updateUserInDashboard={setUser} />}
            {activeSection === "password" && <PasswordUpdateSection user={user} />}
          </section>
        </main>
      </div>
      <Footer />

      {feedbackFormSessionId && (
        <FeedbackForm
          userId={user.userId}
          sessionId={feedbackFormSessionId}
          onClose={closeFeedbackForm}
          onFeedbackSubmitted={onFeedbackSubmitted}
        />
      )}
    </div>
  );
}

function Navbar({ userName, onLogout }) {
  return (
    <header className="instructor-navbar">
      <div className="brand">
        <img src="/logo.png" alt="AsanaConnect Logo" style={{ width: 40, marginRight: "0.5rem" }} />
        AsanaConnect User
      </div>
      <div className="nav-actions">
        <span>Welcome, {userName}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

function WelcomeSection({ user, bookings = [] }) {
  const totalBooked = bookings.length;
  const targetSessions = 10;
  const progress = Math.min(100, Math.round((totalBooked / targetSessions) * 100));

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const size = 260;

  return (
    <div
      className="welcome-content"
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "12px",
        color: "#223366",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "2rem 1rem 2rem 1rem",
        gap: "1.2rem",
        boxShadow: "0 0 28px 0 rgba(0,0,0,0.08)",
      }}
    >
      <img
        src="/logo.png"
        alt="AsanaConnect Logo"
        style={{
          width: 110,
          marginBottom: "0.4rem",
          filter: "drop-shadow(0 0 8px #befcff)",
        }}
      />
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "2.3rem",
          color: "#223366",
          marginBottom: 0,
          marginTop: 0,
          letterSpacing: "0.015em",
        }}
      >
        Welcome, {user?.name}!
      </h1>

      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
          <defs>
            <radialGradient id="wavy-glow" r="70%" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#97f9fa" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#64e0f7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1de0ff" stopOpacity="0.19" />
            </radialGradient>
          </defs>
          <path
            d={`
              M${size / 2} ${size * 0.13}
              Q${size * 0.78} ${size * 0.16} ${size * 0.81} ${size * 0.36}
              Q${size * 0.98} ${size * 0.52} ${size * 0.75} ${size * 0.77}
              Q${size * 0.7} ${size * 0.93} ${size / 2} ${size * 0.94}
              Q${size * 0.31} ${size * 0.92} ${size * 0.25} ${size * 0.77}
              Q${size * 0.02} ${size * 0.52} ${size * 0.19} ${size * 0.36}
              Q${size * 0.22} ${size * 0.16} ${size / 2} ${size * 0.13}
              Z
            `}
            fill="url(#wavy-glow)"
          >
            <animateTransform attributeName="transform" type="rotate" from="0 130 130" to="359 130 130" dur="18s" repeatCount="indefinite" />
          </path>
        </svg>
        <svg width={size} height={size} style={{ position: "absolute", zIndex: 2, left: 0, top: 0, transform: "rotate(-90deg)" }}>
          <circle r={radius} cx={size / 2} cy={size / 2} fill="none" stroke="#e0e0e0" strokeWidth={16} />
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="none"
            stroke="url(#linearGrad)"
            strokeWidth={16}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.67,.13,.63,.96)", filter: "drop-shadow(0 0 15px #64e0f7)" }}
          />
          <defs>
            <linearGradient id="linearGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00ffd0" />
              <stop offset="80%" stopColor="#0bb5ff" />
            </linearGradient>
          </defs>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <span style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0bb5ff" }}>{totalBooked}</span>
          <span style={{ marginTop: "-1px", fontSize: "1.15rem", color: "#3d69a8", fontWeight: "bold" }}>Sessions Booked</span>
        </div>
      </div>

      <p style={{ fontSize: "1.05rem", color: "#156187", fontWeight: 700, textAlign: "center", maxWidth: 340, margin: "0.6rem auto 0 auto" }}>
        You are <span style={{ color: "#00bf9a" }}>{progress}%</span> towards your goal of booking {targetSessions} sessions!
      </p>
    </div>
  );
}

function BookingsSection({ bookings, feedbacks, openFeedbackForm }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p>You have no bookings.</p>;
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
      {bookings.map((booking) => {
        const session = booking.session || {};
        const existingFeedback = feedbacks[session.sessionId];

        let dateStr = "TBD";
        let timeStr = "TBD";
        if (session.sessionTime) {
          try {
            const dt = new Date(session.sessionTime);
            dateStr = dt.toLocaleDateString();
            timeStr = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          } catch {
            dateStr = "Invalid Date";
            timeStr = "Invalid Time";
          }
        }

        return (
          <div
            key={booking.bookingId || booking.id}
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
              color: "#18181b",
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/261/144/non_2x/woman-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax-recreation-healthy-lifestyle-illustration-in-flat-cartoon-style-free-vector.jpg"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22, zIndex: 0 }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", padding: 24, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ marginBottom: "auto" }}>
                <h3 style={{ fontSize: "1.23rem", fontWeight: "bold", margin: 0, marginBottom: 8, letterSpacing: "0.01em" }}>
                  {session.sessionName || "Session"}
                </h3>
                <p style={{ margin: 0, fontWeight: 600, lineHeight: "1.4" }}>
                  <strong>Date:</strong> {dateStr}
                </p>
                <p style={{ margin: 0, fontWeight: 600, lineHeight: "1.4" }}>
                  <strong>Time:</strong> {timeStr}
                </p>

                {/* Emotion display */}
                <p style={{ margin: 0, fontWeight: 600, lineHeight: "1.4", color: "#2563eb" }}>
                  <strong>Emotion:</strong>{" "}
                  {session.emotion ? session.emotion.charAt(0).toUpperCase() + session.emotion.slice(1) : "N/A"}
                </p>

                <p style={{ margin: 0, fontWeight: 600, lineHeight: "1.4", wordBreak: "break-word", color: "#2563eb" }}>
                  <strong>Meeting Link:</strong>{" "}
                  {session.meetingLink ? (
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline", fontWeight: 700 }}>
                      Link
                    </a>
                  ) : (
                    "Not available"
                  )}
                </p>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                <button disabled style={{ flex: 1, background: "#2563eb", color: "white", border: "none", padding: "10px 0", borderRadius: 8, fontWeight: "bold", fontSize: "0.97rem", boxShadow: "0 2px 9px #2563eb7c", transition: "background 0.22s", minWidth: 0, cursor: "default" }}>
                  Booked
                </button>
                {existingFeedback ? (
                  <div style={{ flex: 1, color: "#2563eb", padding: 10, border: "1px solid #2563eb", borderRadius: 8, fontSize: "0.9rem" }}>
                    <strong>Your Feedback:</strong> {existingFeedback.comments || "No comments"}
                    <br />
                    <strong>Rating:</strong> {existingFeedback.rating || "N/A"}
                  </div>
                ) : (
                  <button
                    style={{ flex: 1, backgroundColor: "#10b981", color: "white", border: "none", padding: "10px 0", borderRadius: 8, fontWeight: "bold", fontSize: "0.97rem", cursor: "pointer" }}
                    onClick={() => openFeedbackForm(session.sessionId)}
                  >
                    Give Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



export default UserDashboard;

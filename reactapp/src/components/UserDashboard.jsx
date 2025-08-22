import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserDashboard.css";
import BrowseSessionsSection from "./BrowseSessionsSection";
import UserProfileSection from "./UserProfileSection";
import PasswordUpdateSection from "./PasswordUpdateSection";


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

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/user/login");
      return;
    }
    setUser(loggedInUser);
    fetchSessions();
    fetchBookings(loggedInUser.userId);
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
            {activeSection === "welcome" && <WelcomeSection user={user} />}
            {activeSection === "browseSessions" && (
              <BrowseSessionsSection
                sessions={sessions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                bookSession={bookSession}
                bookedSessionIds={new Set(bookings.map((b) => b.sessionId))}
                bookingStatus={bookingStatus}
              />
            )}
            {activeSection === "bookings" && <BookingsSection bookings={bookings} />}
            {activeSection === "profile" && (
              <UserProfileSection user={user} updateUserInDashboard={setUser} />
            )}
            {activeSection === "password" && <PasswordUpdateSection user={user} />}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function Navbar({ userName, onLogout }) {
  return (
    <header className="instructor-navbar">
      <div className="brand">
        <img
          src="/logo.png"
          alt="AsanaConnect Logo"
          style={{ width: 40, marginRight: "0.5rem" }}
        />
        AsanaConnect User
      </div>
      <div className="nav-actions">
        <span>Welcome, {userName}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

function WelcomeSection({ user }) {
  return (
    <div
      className="welcome-content"
      style={{
        backgroundColor: "#f0f0f0",
        padding: "3rem",
        borderRadius: "12px",
        color: "black",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img
        src="/logo.png"
        alt="AsanaConnect Logo"
        style={{ width: 120, marginBottom: "2rem" }}
      />
      <h1>Welcome Back, {user?.name}!</h1>
      <p
        style={{
          maxWidth: 600,
          textAlign: "center",
          fontSize: 18,
          marginTop: 20,
        }}
      >
        We’re glad to see you again. Use your dashboard to browse sessions,
        manage your bookings, and update your profile whenever needed.
      </p>
    </div>
  );
}

function BookingsSection({ bookings }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p>You have no bookings.</p>;
  }
  return (
    <div className="sessions-list">
      {bookings.map((booking) => {
        let dateStr = "TBD";
        let timeStr = "TBD";
        if (booking.sessionTime) {
          try {
            const dt = new Date(booking.sessionTime);
            dateStr = dt.toLocaleDateString();
            timeStr = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          } catch {
            dateStr = "Invalid Date";
            timeStr = "Invalid Time";
          }
        }
        return (
          <div key={booking.bookingId || booking.id} className="session-item">
            <h3>{booking.sessionName || booking.sessionTitle || "Session"}</h3>
            <p><strong>Date:</strong> {dateStr}</p>
            <p><strong>Time:</strong> {timeStr}</p>
            <p><strong>Status:</strong> {booking.status || "Confirmed"}</p>
            {booking.meetingLink && (
              <p>
                <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a>
              </p>
            )}
          </div>
        );
      })}
    
    </div>
  );
}

export default UserDashboard;

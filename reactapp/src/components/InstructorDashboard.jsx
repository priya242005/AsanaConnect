import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NewSessionSection from "./NewSessionSection";
import SessionsSection from "./SessionsSection";
import ProfileSection from "./ProfileSection";
import InstructorPasswordUpdate from "./InstructorPasswordUpdate";
import "./InstructorDashboard.css";

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

function InstructorDashboard({ loggedInInstructor, setLoggedInInstructor }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("welcome");
  const [instructor, setInstructor] = useState(loggedInInstructor);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!loggedInInstructor) {
      navigate("/login");
      return;
    }
    setInstructor(loggedInInstructor);
    fetchSessions(loggedInInstructor.instructorId);
  }, [location.state, loggedInInstructor, navigate]);

  async function fetchSessions(instructorId) {
    try {
      const response = await fetch(`http://localhost:8080/instructors/${instructorId}/sessions`);
      const data = await response.json();
      setSessions(data);
    } catch {
      alert("Error fetching sessions");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInInstructor");
    setLoggedInInstructor(null);
    navigate("/");
  };

  const menuItems = [
    { id: "welcome", label: "Welcome" },
    { id: "newSession", label: "New Session" },
    { id: "sessions", label: "Sessions" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Change Password" },
  ];

  const WelcomeSection = () => (
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
      <img src="/logo.png" alt="AsanaConnect Logo" style={{ width: 120, marginBottom: "2rem" }} />
      <h1>Welcome Back, {instructor?.name}!</h1>
      <p style={{ maxWidth: "600px", textAlign: "center", fontSize: "1.1rem", marginTop: "1rem" }}>
        We’re glad to see you again. Use your dashboard to easily manage your yoga sessions, track bookings, and update your profile whenever needed.
      </p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="instructor-dashboard-wrapper" style={{ flexGrow: 1 }}>
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
          <Navbar instructorName={instructor?.name} onLogout={handleLogout} />
          <section className="content-section">
            {activeSection === "welcome" && <WelcomeSection />}
            {activeSection === "newSession" && (
              <NewSessionSection
                instructorId={instructor?.instructorId}
                refreshSessions={() => fetchSessions(instructor.instructorId)}
              />
            )}
            {activeSection === "sessions" && (
              <SessionsSection
                sessions={sessions}
                refreshSessions={() => fetchSessions(instructor.instructorId)}
              />
            )}
            {activeSection === "profile" && (
              <ProfileSection instructor={instructor} setInstructor={setInstructor} />
            )}
            {activeSection === "password" && (
              <InstructorPasswordUpdate instructor={instructor} />
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function Navbar({ instructorName, onLogout }) {
  return (
    <header className="instructor-navbar">
      <div className="brand">AsanaConnect Instructor</div>
      <div className="nav-actions">
        <span>Welcome, {instructorName}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default InstructorDashboard;

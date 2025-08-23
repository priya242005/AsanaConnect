import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NewSessionSection from "./NewSessionSection";
import SessionsSection from "./SessionsSection";
import ProfileSection from "./ProfileSection";
import InstructorPasswordUpdate from "./InstructorPasswordUpdate";
import FeedbackSection from "./FeedbackSection"; // Import FeedbackSection
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
      const response = await fetch(
        `http://localhost:8080/instructors/${instructorId}/sessions`
      );
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
    { id: "feedback", label: "Feedback" }, // New Feedback menu
    { id: "profile", label: "Profile" },
    { id: "password", label: "Change Password" },
  ];

  // Inline circular progress in welcome section
  const WelcomeSection = () => {
    const totalBooked = sessions.length; // Assuming sessions count is the metric
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
          Welcome, {instructor?.name}!
        </h1>

        <div style={{ position: "relative", width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          >
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
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${size / 2} ${size / 2}`}
                to={`359 ${size / 2} ${size / 2}`}
                dur="18s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <svg
            width={size}
            height={size}
            style={{ position: "absolute", zIndex: 2, left: 0, top: 0, transform: "rotate(-90deg)" }}
          >
            <circle
              r={radius}
              cx={size / 2}
              cy={size / 2}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth={16}
            />
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
              style={{
                transition: "stroke-dashoffset 0.7s cubic-bezier(.67,.13,.63,.96)",
                filter: "drop-shadow(0 0 15px #64e0f7)",
              }}
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
            <span style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0bb5ff" }}>
              {totalBooked}
            </span>
            <span
              style={{
                marginTop: "-1px",
                fontSize: "1.15rem",
                color: "#3d69a8",
                fontWeight: "bold",
              }}
            >
              Sessions Created
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: "1.05rem",
            color: "#156187",
            fontWeight: 700,
            textAlign: "center",
            maxWidth: 340,
            margin: "0.6rem auto 0 auto",
          }}
        >
          You are{" "}
          <span style={{ color: "#00bf9a" }}>{progress}%</span> towards your goal
          of conducting {targetSessions} sessions!
        </p>
      </div>
    );
  };

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
            {activeSection === "feedback" && (
              <FeedbackSection instructorId={instructor?.instructorId} />
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
    <header className="instructor-navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem" }}>
      <div className="brand" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/logo.png" alt="AsanaConnect Logo" style={{ height: 32, width: 32, objectFit: "contain" }} />
        <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2563eb" }}>AsanaConnect Instructor</span>
      </div>
      <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>Welcome, {instructorName}</span>
        <button onClick={onLogout} style={{ padding: "6px 12px", backgroundColor: "#2563eb", border: "none", color: "white", borderRadius: 6, cursor: "pointer" }}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default InstructorDashboard;

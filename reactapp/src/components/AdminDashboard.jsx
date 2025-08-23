import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

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

function AdminDashboard({ loggedInAdmin, setLoggedInAdmin }) {
  const [adminName, setAdminName] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("welcome");

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInAdmin) {
      navigate("/admin/login");
      return;
    }
    setAdminName(loggedInAdmin.username);

    async function fetchData() {
      try {
        const insRes = await fetch("http://localhost:8080/getAllInstructors");
        const insData = await insRes.json();
        const userRes = await fetch("http://localhost:8080/users/all");
        const userData = await userRes.json();
        const sessionRes = await fetch("http://localhost:8080/sessions");
        let sessionData = await sessionRes.json();
        if (!Array.isArray(sessionData)) {
          sessionData = sessionData.sessions || [];
        }

        setInstructors(insData);
        setUsers(userData);
        setSessions(sessionData);
      } catch {
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [loggedInAdmin, navigate]);

  const handleDeleteInstructor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this instructor?")) return;
    try {
      const res = await fetch(`http://localhost:8080/instructor/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInstructors((prev) => prev.filter((i) => i.instructorId !== id));
      } else {
        alert("Failed to delete instructor");
      }
    } catch {
      alert("Network error while deleting instructor");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.userId !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch {
      alert("Network error while deleting user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    if (setLoggedInAdmin) setLoggedInAdmin(null);
    navigate("/");
  };

  if (loading) return <div className="loading">Loading...</div>;

  const menuItems = [
    { id: "welcome", label: "Welcome" },
    { id: "instructors", label: "Instructors" },
    { id: "users", label: "Users" },
    { id: "sessions", label: "Sessions" },
    { id: "updatePassword", label: "Update Password" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div className="admin-dashboard-wrapper" style={{ flexGrow: 1 }}>
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => setActiveSection(item.id)}
                style={{ fontFamily: "inherit" }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <header className="admin-navbar" style={{ fontFamily: "inherit" }}>
            <div className="brand" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="AsanaConnect Logo"
                style={{ width: 40, marginRight: "0.5rem" }}
              />
              AsanaConnect Admin - {adminName}
            </div>
            <div className="nav-actions">
              <button className="logout-btn" onClick={handleLogout} style={{ fontFamily: "inherit" }}>
                Logout
              </button>
            </div>
          </header>

          <section className="content-section" style={{ fontFamily: "inherit" }}>
            {activeSection === "welcome" && (
              <WelcomeSection
                instructorsCount={instructors.length}
                usersCount={users.length}
                adminName={adminName}
              />
            )}
            {activeSection === "instructors" && (
              <InstructorsList instructors={instructors} onDelete={handleDeleteInstructor} />
            )}
            {activeSection === "users" && <UsersList users={users} onDelete={handleDeleteUser} />}
            {activeSection === "sessions" && <SessionsList sessions={sessions} />}
            {activeSection === "updatePassword" && (
              <UpdatePasswordForm adminName={adminName} onClose={() => setActiveSection("welcome")} />
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function WelcomeSection({ instructorsCount, usersCount, adminName }) {
  const maxValue = Math.max(instructorsCount, usersCount, 10);

  return (
    <div
      className="welcome-content"
      style={{ fontFamily: "inherit", textAlign: "center", padding: "2rem" }}
    >
      {/* Logo */}
      <img
        src="/logo.png" // Adjust path if needed
        alt="AsanaConnect Logo"
        style={{ width: 80, marginBottom: "1rem" }}
      />

      <h1 style={{ fontFamily: "inherit" }}>Welcome, {adminName}</h1>

      <div
        className="performance-overview"
        style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "1.5rem" }}
      >
        <div className="performance-circle large">
          <AnimatedCircularProgressbar
            value={instructorsCount}
            maxValue={maxValue}
            subtext={`${instructorsCount} Instructors`}
            pathColor="#2563eb"
            trailColor="#dbeafe"
          />
        </div>
        <div className="performance-circle large">
          <AnimatedCircularProgressbar
            value={usersCount}
            maxValue={maxValue}
            subtext={`${usersCount} Users`}
            pathColor="#10b981"
            trailColor="#d1fae5"
          />
        </div>
      </div>

      <p
        className="welcome-description"
        style={{ fontFamily: "inherit", marginTop: "2rem", fontSize: "1.1rem" }}
      >
        Your platform has <strong>{instructorsCount}</strong> active instructors and{" "}
        <strong>{usersCount}</strong> registered users.
      </p>
    </div>
  );
}


function AnimatedCircularProgressbar({ value, maxValue, subtext, pathColor, trailColor }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let current = 0;
    const step = value / 60;
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setProgress(current);
    }, 16);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div
      style={{
        width: 160, // Increased size
        height: 160,
        margin: "0 auto",
        position: "relative",
        borderRadius: "50%",
      }}
    >
      <CircularProgressbar
        value={progress}
        maxValue={maxValue}
        text={" "}
        styles={buildStyles({
          pathColor,
          trailColor,
        })}
      />
      <div
        style={{
          position: "absolute",
          top: "32%",
          width: "100%",
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          fontFamily: "inherit",
        }}
      >
        <span
          style={{
            fontSize: "2.3rem",
            fontWeight: 700,
            color: pathColor,
            lineHeight: 1.1,
          }}
        >
          {typeof value === "number" ? Math.round(value) : "-"}
        </span>
        <span
          style={{
            fontSize: "1.15rem",
            color: pathColor,
            fontWeight: 700,
            marginTop: 2,
            whiteSpace: "nowrap",
          }}
        >
          {subtext}
        </span>
      </div>
    </div>
  );
}

function UpdatePasswordForm({ adminName, onClose }) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const adminId = loggedInAdmin?.adminId || loggedInAdmin?.id || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8080/admins/${adminId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        setMessage("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        const err = await res.text();
        setMessage(err || "Failed to update password");
      }
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <div className="update-password-container" style={{ fontFamily: "inherit" }}>
      <h2 style={{ fontFamily: "inherit" }}>Update Password for {adminName}</h2>
      <form onSubmit={handleSubmit}>
        <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={{ fontFamily: "inherit" }}
        />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ fontFamily: "inherit" }}
        />
        <button type="submit" style={{ fontFamily: "inherit" }}>
          Update Password
        </button>
      </form>
      {message && <p className="message" style={{ fontFamily: "inherit" }}>{message}</p>}
    </div>
  );
}

function InstructorsList({ instructors, onDelete }) {
  const [filter, setFilter] = React.useState("");

  const filtered = instructors.filter((inst) => {
    const input = filter.toLowerCase();
    return (
      inst.name.toLowerCase().includes(input) ||
      (inst.yogaSpecialty && inst.yogaSpecialty.toLowerCase().includes(input)) ||
      (inst.classPreference && inst.classPreference.toLowerCase().includes(input)) ||
      (inst.phoneNumber && inst.phoneNumber.toLowerCase().includes(input)) ||
      (inst.certification && inst.certification.toLowerCase().includes(input)) ||
      (String(inst.experienceYears || "").includes(input))
    );
  });

  return (
    <div style={{ fontFamily: "inherit" }}>
      <h2>Instructors</h2>
      <input
        type="search"
        placeholder="Search name, specialty, certification, etc."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
        style={{ fontFamily: "inherit" }}
      />
      <ul className="data-list" style={{ fontFamily: "inherit" }}>
        {filtered.length > 0 ? (
          filtered.map((inst) => (
            <li key={inst.instructorId} className="data-item" style={{ fontFamily: "inherit" }}>
              <div>
                <strong>{inst.name}</strong> – {inst.yogaSpecialty || "N/A"}
                <br />
                <span style={{ fontFamily: "inherit" }}>
                  Certification: {inst.certification}, Phone: {inst.phoneNumber}, Exp: {inst.experienceYears} years
                </span>
              </div>
              <button className="delete-btn" onClick={() => onDelete(inst.instructorId)} style={{ fontFamily: "inherit" }}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No instructors found.</li>
        )}
      </ul>
    </div>
  );
}

function UsersList({ users, onDelete }) {
  const [filter, setFilter] = React.useState("");

  const filtered = users.filter((user) => {
    const input = filter.toLowerCase();
    return (
      user.name.toLowerCase().includes(input) ||
      user.email.toLowerCase().includes(input) ||
      (user.phoneNumber && user.phoneNumber.toLowerCase().includes(input))
    );
  });

  return (
    <div style={{ fontFamily: "inherit" }}>
      <h2>Users</h2>
      <input
        type="search"
        placeholder="Search name, email, phone, etc."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
        style={{ fontFamily: "inherit" }}
      />
      <ul className="data-list" style={{ fontFamily: "inherit" }}>
        {filtered.length > 0 ? (
          filtered.map((user) => (
            <li key={user.userId} className="data-item" style={{ fontFamily: "inherit" }}>
              <div>
                <strong>{user.name}</strong> – {user.email}
                {user.phoneNumber ? <> | {user.phoneNumber}</> : null}
              </div>
              <button className="delete-btn" onClick={() => onDelete(user.userId)} style={{ fontFamily: "inherit" }}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

function SessionsList({ sessions }) {
  const [filter, setFilter] = React.useState("");

  const safeSessions = Array.isArray(sessions) ? sessions : [];

  const filteredSessions = safeSessions.filter((session) =>
    session.sessionName?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "inherit" }}>
      <h2>Sessions</h2>
      <input
        type="search"
        placeholder="Search sessions"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
        style={{ fontFamily: "inherit" }}
      />
      <ul className="data-list" style={{ fontFamily: "inherit" }}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <li key={session.sessionId} className="data-item" style={{ fontFamily: "inherit" }}>
              <div>
                <strong>{session.sessionName}</strong> –{" "}
                {session.sessionTime ? new Date(session.sessionTime).toLocaleString() : "No date"}
                <br />
                <span style={{ fontFamily: "inherit" }}>Slots: {session.slots}</span>
              </div>
            </li>
          ))
        ) : (
          <li>No sessions found.</li>
        )}
      </ul>
    </div>
  );
}

export default AdminDashboard;

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
        setInstructors(insData);
        setUsers(userData);
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
    { id: "updatePassword", label: "Update Password" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="admin-dashboard-wrapper" style={{ flexGrow: 1 }}>
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
          <header className="admin-navbar">
            <div className="brand" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="AsanaConnect Logo"
                style={{ width: 40, marginRight: "0.5rem" }}
              />
              AsanaConnect Admin - {adminName}
            </div>
            <div className="nav-actions">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          <section className="content-section">
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
            {activeSection === "users" && (
              <UsersList users={users} onDelete={handleDeleteUser} />
            )}
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
    <div className="welcome-content">
      <h1>Welcome, {adminName}</h1>
      <div className="performance-overview">
        <div className="performance-circle large">
          <AnimatedCircularProgressbar
            value={instructorsCount}
            maxValue={maxValue}
            text={`${instructorsCount} Instructors`}
            pathColor="#2563eb"
            trailColor="#dbeafe"
            textColor="#2563eb"
          />
        </div>
        <div className="performance-circle large">
          <AnimatedCircularProgressbar
            value={usersCount}
            maxValue={maxValue}
            text={`${usersCount} Users`}
            pathColor="#10b981"
            trailColor="#d1fae5"
            textColor="#10b981"
          />
        </div>
      </div>
      <p className="welcome-description">
        Your platform has <strong>{instructorsCount}</strong> active instructors and{" "}
        <strong>{usersCount}</strong> registered users. Use the menu on the left to manage and review their information.
      </p>
    </div>
  );
}


function AnimatedCircularProgressbar({ value, maxValue, text, pathColor, trailColor, textColor }) {
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
    <CircularProgressbar
      value={progress}
      maxValue={maxValue}
      text={text}
      styles={buildStyles({
        pathColor,
        trailColor,
        textColor,
        textSize: "12px",
      })}
    />
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
    <div className="update-password-container">
      <h2>Update Password for {adminName}</h2>
      <form onSubmit={handleSubmit}>
        <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p className="message">{message}</p>}
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
    <div>
      <h2>Instructors</h2>
      <input
        type="search"
        placeholder="Search name, specialty, certification, etc."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <ul className="data-list">
        {filtered.length > 0 ? (
          filtered.map((inst) => (
            <li key={inst.instructorId} className="data-item">
              <div>
                <strong>{inst.name}</strong> – {inst.yogaSpecialty || "N/A"}
                <br />
                <span>
                  Certification: {inst.certification}, Phone: {inst.phoneNumber}, Exp: {inst.experienceYears} years
                </span>
              </div>
              <button className="delete-btn" onClick={() => onDelete(inst.instructorId)}>
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
    <div>
      <h2>Users</h2>
      <input
        type="search"
        placeholder="Search name, email, phone, etc."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <ul className="data-list">
        {filtered.length > 0 ? (
          filtered.map((user) => (
            <li key={user.userId} className="data-item">
              <div>
                <strong>{user.name}</strong> – {user.email}
                {user.phoneNumber ? <> | {user.phoneNumber}</> : null}
              </div>
              <button className="delete-btn" onClick={() => onDelete(user.userId)}>
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

export default AdminDashboard;

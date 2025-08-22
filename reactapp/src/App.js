import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import InstructorLogin from "./components/InstructorLogin";
import BecomeInstructor from "./components/BecomeInstructor";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import UserDashboard from "./components/UserDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminProfile from "./components/AdminProfile";
import InstructorDashboard from "./components/InstructorDashboard";

function App() {
  // User login state
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Instructor login state
  const [loggedInInstructor, setLoggedInInstructor] = useState(() => {
    const savedInstructor = localStorage.getItem("loggedInInstructor");
    return savedInstructor ? JSON.parse(savedInstructor) : null;
  });

  // Admin login state
  const [loggedInAdmin, setLoggedInAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("loggedInAdmin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const adminId = loggedInAdmin?.adminId || null;
  const adminName = loggedInAdmin?.username || "";

  const instructorId = loggedInInstructor?.instructorId || null;
  const userId = loggedInUser?.userId || null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Instructor routes */}
        <Route
          path="/login"
          element={
            instructorId ? (
              <Navigate to="/instructor-dashboard" replace />
            ) : (
              <InstructorLogin setLoggedInInstructor={setLoggedInInstructor} />
            )
          }
        />
        <Route path="/apply" element={<BecomeInstructor />} />
        <Route
          path="/instructor-dashboard"
          element={
            instructorId ? (
              <InstructorDashboard
                loggedInInstructor={loggedInInstructor}
                setLoggedInInstructor={setLoggedInInstructor}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* User routes */}
        <Route
          path="/user/login"
          element={
            userId ? (
              <Navigate to="/user/dashboard" replace />
            ) : (
              <UserLogin setLoggedInUser={setLoggedInUser} />
            )
          }
        />
        <Route
          path="/user/signup"
          element={<UserSignup setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/user/dashboard"
          element={
            userId ? (
              <UserDashboard
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            ) : (
              <Navigate to="/user/login" replace />
            )
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/login"
          element={
            adminId ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin setLoggedInAdmin={setLoggedInAdmin} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            adminId ? (
              <AdminDashboard
                adminName={adminName}
                loggedInAdmin={loggedInAdmin}
                setLoggedInAdmin={setLoggedInAdmin}
              />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="/admin/profile"
          element={
            adminId ? (
              <AdminProfile adminId={adminId} adminUsername={adminName} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

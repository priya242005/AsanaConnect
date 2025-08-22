import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./User.css";

function UserSignup({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSubmitError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.password.trim()) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const msg = await response.text();
        setSubmitError(msg || "Signup failed");
      } else {
        const user = await response.json();
        if (user.password) delete user.password;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        if (setLoggedInUser) setLoggedInUser(user);
        navigate("/user/dashboard"); // Redirect after successful signup
      }
    } catch {
      setSubmitError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="user-sign-bg">
  <div className="user-sign-form-container">
      <div style={{
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 1000
}}>
  <button
    onClick={() => window.location.href = '/'}
    style={{
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '8px 14px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem'
    }}
  >
    Back to Home
  </button>
</div>

      <h2>User Signup</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name <span className="required">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            autoComplete="name"
          />
          {errors.name && <div className="error-msg">{errors.name}</div>}
        </label>

        <label>
          Email <span className="required">*</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            autoComplete="email"
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </label>

        <label>
          Password <span className="required">*</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            autoComplete="new-password"
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </label>

        {submitError && <div className="error-msg form-error">{submitError}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div style={{ marginTop: "1.5rem", fontSize: "1rem", textAlign: "center" }}>
  Already have an account?{" "}
  <Link to="/user/login" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>
    Login here
  </Link>
</div>

    </div>
    </div>
  );
}

export default UserSignup;

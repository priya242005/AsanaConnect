import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructor.css";

function InstructorLogin({ setLoggedInInstructor }) {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSubmitError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.password.trim()) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/instructor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const msg = await response.text();
        setSubmitError(msg || "Login failed");
      } else {
        const instructorData = await response.json();
        localStorage.setItem("loggedInInstructor", JSON.stringify(instructorData));
        if (setLoggedInInstructor) setLoggedInInstructor(instructorData); // update state immediately
        navigate("/instructor-dashboard", { state: { fromLogin: true } });
      }
    } catch (error) {
      setSubmitError("Network error. Please try again later.");
      console.error("Login fetch error:", error);
    }
    setLoading(false);
  };

  return (
   <div className="instructor-login-bg">
  <div className="instructor-form-container">
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

      <h2 className="form-title">Instructor Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label className="form-label">
          Name <span className="required">*</span>:
          <input
            type="text"
            name="name"
            placeholder="Instructor name"
            className={errors.name ? "input-error" : ""}
            value={formData.name}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.name && <div className="error-msg">{errors.name}</div>}
        </label>

        <label className="form-label">
          Password <span className="required">*</span>:
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={errors.password ? "input-error" : ""}
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </label>

        {submitError && <div className="error-msg form-error">{submitError}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="redirect-link" style={{ marginTop: "1rem", textAlign: "center" }}>
      Don't have an account?{" "}
      <a href="/apply" className="link-text">
        Sign Up here
      </a>
    </div>
    </div>
    </div>
  );
}

export default InstructorLogin;

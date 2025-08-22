import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./User.css";

function UserLogin({ setLoggedInUser }) {
  const [formData, setFormData] = useState({ name: "", password: "" });
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
    if (!formData.name.trim()) errs.name = "Username is required";
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
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const msg = await response.text();
        setSubmitError(msg || "Login failed");
      } else {
        const user = await response.json();
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        if (setLoggedInUser) setLoggedInUser(user);
        navigate("/user/dashboard", { state: { fromLogin: true } });
      }
    } catch {
      setSubmitError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="user-login-bg">
  <div className="user-form-container">
    

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

      <h2>User Login</h2>
        
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Username <span className="required">*</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            autoComplete="username"
          />
          {errors.name && <div className="error-msg">{errors.name}</div>}
        </label>

        <label>
          Password <span className="required">*</span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            autoComplete="current-password"
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </label>

        {submitError && <div className="error-msg form-error">{submitError}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div style={{ marginTop: "1.5rem", fontSize: "1rem", textAlign: "center" }}>
  Don't have an account?{" "}
  <Link to="/user/signup" style={{ color: "#256eb", fontWeight: "600", textDecoration: "none" }}>
    Sign up here
  </Link>
</div>

    </div>
     </div>

  );
}

export default UserLogin;

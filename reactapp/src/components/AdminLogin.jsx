// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css";

// function AdminLogin({ setLoggedInAdmin }) {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [submitError, setSubmitError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setSubmitError("");
//   };

//   const validate = () => {
//     const errs = {};
//     if (!formData.username.trim()) errs.username = "Username is required";
//     if (!formData.password.trim()) errs.password = "Password is required";
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     setErrors(errs);
//     if (Object.keys(errs).length > 0) return;

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8080/admins/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const msg = await response.text();
//         setSubmitError(msg || "Login failed");
//       } else {
//         const adminData = await response.json();
//         localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));
//         if (setLoggedInAdmin) setLoggedInAdmin(adminData); // Update state immediately
//         navigate("/admin/dashboard");
//       }
//     } catch {
//       setSubmitError("Network error. Please try again later.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="admin-form-container">
//       <div style={{
//   position: 'fixed',
//   top: '20px',
//   right: '20px',
//   zIndex: 1000
// }}>
//   <button
//     onClick={() => window.location.href = '/'}
//     style={{
//       backgroundColor: '#2563eb',
//       color: '#fff',
//       border: 'none',
//       padding: '8px 14px',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '1rem'
//     }}
//   >
//     Back to Home
//   </button>
// </div>

//       <h2>Admin Login</h2>
//       <form onSubmit={handleSubmit} noValidate>
//         <label>
//           Username <span className="required">*</span>
//           <input
//             type="text"
//             name="username"
//             placeholder="Admin username"
//             value={formData.username}
//             onChange={handleChange}
//             className={errors.username ? "input-error" : ""}
//             autoComplete="username"
//           />
//           {errors.username && <div className="error-msg">{errors.username}</div>}
//         </label>

//         <label>
//           Password <span className="required">*</span>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             className={errors.password ? "input-error" : ""}
//             autoComplete="current-password"
//           />
//           {errors.password && <div className="error-msg">{errors.password}</div>}
//         </label>

//         {submitError && <div className="error-msg form-error">{submitError}</div>}

//         <button type="submit" className="submit-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminLogin({ setLoggedInAdmin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
    if (!formData.username.trim()) errs.username = "Username is required";
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
      const response = await fetch("http://localhost:8080/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const msg = await response.text();
        setSubmitError(msg || "Login failed");
      } else {
        const adminData = await response.json();
        localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));
        if (setLoggedInAdmin) setLoggedInAdmin(adminData);
        navigate("/admin/dashboard");
      }
    } catch {
      setSubmitError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
  <div className="admin-login-bg">
    <div className="admin-form-container">
      <button
        className="back-home-btn"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </button>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Username <span className="required">*</span>
          <input
            type="text"
            name="username"
            placeholder="Admin username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
            autoComplete="username"
          />
          {errors.username && <div className="error-msg">{errors.username}</div>}
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
    </div>
  </div>
);

}

export default AdminLogin;

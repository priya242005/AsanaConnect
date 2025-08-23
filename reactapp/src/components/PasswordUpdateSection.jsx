import React, { useState, useEffect } from "react";

function PasswordUpdateSection({ user }) {
  const [formData, setFormData] = useState({
    email: "",              // add email here
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate email from user prop
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!formData.currentPassword.trim()) errs.currentPassword = "Current password is required";
    if (!formData.newPassword.trim()) errs.newPassword = "New password is required";
    else if (formData.newPassword.length < 6) errs.newPassword = "New password must be at least 6 characters";
    if (formData.confirmNewPassword !== formData.newPassword) errs.confirmNewPassword = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
    setSubmitError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});
    setSubmitError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`http://localhost:8080/users/${user.userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          // email is not typically sent for password update, omit if backend doesn't expect it
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setSubmitError(msg || "Password update failed");
      } else {
        setSuccessMsg("Password updated successfully.");
        setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "", confirmNewPassword: "" }));
      }
    } catch {
      setSubmitError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="password-update-section">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed", marginBottom: "1rem" }}
          />
        </label>

        <label>
          Current Password <span className="required">*</span>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={errors.currentPassword ? "input-error" : ""}
          />
          {errors.currentPassword && <div className="error-msg">{errors.currentPassword}</div>}
        </label>

        <label>
          New Password <span className="required">*</span>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={errors.newPassword ? "input-error" : ""}
          />
          {errors.newPassword && <div className="error-msg">{errors.newPassword}</div>}
        </label>

        <label>
          Confirm New Password <span className="required">*</span>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className={errors.confirmNewPassword ? "input-error" : ""}
          />
          {errors.confirmNewPassword && <div className="error-msg">{errors.confirmNewPassword}</div>}
        </label>

        {submitError && <div className="error-msg form-error">{submitError}</div>}
        {successMsg && <div className="success-msg">{successMsg}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default PasswordUpdateSection;

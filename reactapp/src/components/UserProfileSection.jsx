import React, { useState } from "react";

function UserProfileSection({ user, updateUserInDashboard }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
    setSubmitError("");
    setSuccessMsg("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.currentPassword.trim()) errs.currentPassword = "Current password is required";
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
    setErrors({});
    setSubmitError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`http://localhost:8080/users/${user.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setSubmitError(msg || "Update failed");
      } else {
        const updatedUser = await res.json();
        updateUserInDashboard(updatedUser);
        setSuccessMsg("Profile updated successfully.");
        setFormData((prev) => ({ ...prev, currentPassword: "" }));
      }
    } catch {
      setSubmitError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="profile-section">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name <span className="required">*</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
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
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </label>

        <label>
          Confirm with Current Password <span className="required">*</span>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={errors.currentPassword ? "input-error" : ""}
          />
          {errors.currentPassword && <div className="error-msg">{errors.currentPassword}</div>}
        </label>

        {submitError && <div className="error-msg form-error">{submitError}</div>}
        {successMsg && <div className="success-msg">{successMsg}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default UserProfileSection;

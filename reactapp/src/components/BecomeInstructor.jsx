import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructor.css";

const yogaSpecialtyOptions = [
  "Hatha",
  "Vinyasa",
  "Ashtanga",
  "Iyengar",
  "Kundalini",
  "Yin",
  "Restorative",
];

const stylesOfferedOptions = [...yogaSpecialtyOptions];

const classPreferenceOptions = ["Online", "Offline"];

function BecomeInstructor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    certification: "",
    yogaSpecialty: "",
    classPreference: "",
    phoneNumber: "",
    experienceYears: "",
    stylesOffered: [],
    hourlyRate: "",
    introVideoUrl: "",
    gender: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let newStyles = [...formData.stylesOffered];
      if (checked) {
        if (!newStyles.includes(value)) newStyles.push(value);
      } else {
        newStyles = newStyles.filter((style) => style !== value);
      }
      setFormData({ ...formData, stylesOffered: newStyles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.certification.trim()) newErrors.certification = "Certification is required";
    if (!formData.yogaSpecialty) newErrors.yogaSpecialty = "Yoga specialty is required";
    if (!formData.classPreference) newErrors.classPreference = "Class preference is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (formData.experienceYears === "" || Number(formData.experienceYears) < 0)
      newErrors.experienceYears = "Valid experience years required";
    if (formData.stylesOffered.length === 0)
      newErrors.stylesOffered = "Select at least one style";
    if (formData.hourlyRate === "" || Number(formData.hourlyRate) < 0)
      newErrors.hourlyRate = "Valid hourly rate required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const payload = {
      ...formData,
      experienceYears: Number(formData.experienceYears),
      hourlyRate: Number(formData.hourlyRate),
    };

    try {
      const res = await fetch("http://localhost:8080/addInstructor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const msg = await res.text();
        setErrors({ form: msg });
      }
    } catch {
      setErrors({ form: "Network error. Try again later." });
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    navigate("/instructor-dashboard");
  };

  return (
    <div className="become-instructor-bg">
  <div className="become-instructor-form-container">
      <h2 className="form-title">Become a Yoga Instructor</h2>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
          }}
        >
          Back to Home
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label className="form-label">
          Name <span className="required">*</span>:
          <input
            name="name"
            placeholder="Full name"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-msg">{errors.name}</div>}
        </label>

        <label className="form-label">
          Certification <span className="required">*</span>:
          <input
            name="certification"
            placeholder="Certification details"
            className={`form-input ${errors.certification ? "input-error" : ""}`}
            value={formData.certification}
            onChange={handleChange}
          />
          {errors.certification && <div className="error-msg">{errors.certification}</div>}
        </label>

        <label className="form-label">
          Yoga Specialty <span className="required">*</span>:
          <select
            name="yogaSpecialty"
            className={`form-select ${errors.yogaSpecialty ? "input-error" : ""}`}
            value={formData.yogaSpecialty}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a specialty
            </option>
            {yogaSpecialtyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.yogaSpecialty && <div className="error-msg">{errors.yogaSpecialty}</div>}
        </label>

        <label className="form-label">
          Class Preference <span className="required">*</span>:
          <select
            name="classPreference"
            className={`form-select ${errors.classPreference ? "input-error" : ""}`}
            value={formData.classPreference}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select class preference
            </option>
            {classPreferenceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.classPreference && <div className="error-msg">{errors.classPreference}</div>}
        </label>

        <label className="form-label">
          Phone Number <span className="required">*</span>:
          <input
            name="phoneNumber"
            placeholder="Contact phone number"
            className={`form-input ${errors.phoneNumber ? "input-error" : ""}`}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <div className="error-msg">{errors.phoneNumber}</div>}
        </label>

        <label className="form-label">
          Years of Experience <span className="required">*</span>:
          <input
            type="number"
            name="experienceYears"
            placeholder="e.g., 5"
            className={`form-input ${errors.experienceYears ? "input-error" : ""}`}
            value={formData.experienceYears}
            onChange={handleChange}
          />
          {errors.experienceYears && <div className="error-msg">{errors.experienceYears}</div>}
        </label>

        <fieldset className={`checkbox-group ${errors.stylesOffered ? "input-error" : ""}`}>
          <legend>
            Styles Offered <span className="required">*</span>:
          </legend>
          {stylesOfferedOptions.map((style) => (
            <label key={style} className="checkbox-label">
              <input
                type="checkbox"
                name="stylesOffered"
                value={style}
                checked={formData.stylesOffered.includes(style)}
                onChange={handleChange}
              />
              {style}
            </label>
          ))}
          {errors.stylesOffered && <div className="error-msg">{errors.stylesOffered}</div>}
        </fieldset>

        <label className="form-label">
          Hourly Rate <span className="required">*</span>:
          <input
            type="number"
            name="hourlyRate"
            placeholder="e.g., 25"
            className={`form-input ${errors.hourlyRate ? "input-error" : ""}`}
            value={formData.hourlyRate}
            onChange={handleChange}
          />
          {errors.hourlyRate && <div className="error-msg">{errors.hourlyRate}</div>}
        </label>

        <label className="form-label">
          Intro Video URL:
          <input
            name="introVideoUrl"
            placeholder="YouTube or Vimeo URL"
            className="form-input"
            value={formData.introVideoUrl}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Gender <span className="required">*</span>:
          <select
            name="gender"
            className={`form-select ${errors.gender ? "input-error" : ""}`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <div className="error-msg">{errors.gender}</div>}
        </label>

        <label className="form-label">
          Password <span className="required">*</span>:
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className={`form-input ${errors.password ? "input-error" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </label>

        {errors.form && <div className="error-msg form-error">{errors.form}</div>}

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>

      {submitted && (
        <div className="modal">
          <div className="modal-content">
            <p>Application submitted successfully!</p>
            <button onClick={closeModal} className="close-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default BecomeInstructor;

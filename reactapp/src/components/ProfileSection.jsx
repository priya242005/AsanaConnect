import React, { useState, useEffect } from "react";

function ProfileSection({ instructor, setInstructor }) {
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
    currentPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const yogaSpecialtyOptions = [
    "Hatha",
    "Vinyasa",
    "Ashtanga",
    "Iyengar",
    "Kundalini",
    "Yin",
    "Restorative",
  ];

  useEffect(() => {
    if (instructor) {
      setFormData({
        name: instructor.name || "",
        certification: instructor.certification || "",
        yogaSpecialty: instructor.yogaSpecialty || "",
        classPreference: instructor.classPreference || "",
        phoneNumber: instructor.phoneNumber || "",
        experienceYears: instructor.experienceYears || "",
        stylesOffered: instructor.stylesOffered || [],
        hourlyRate: instructor.hourlyRate || "",
        introVideoUrl: instructor.introVideoUrl || "",
        gender: instructor.gender || "",
        currentPassword: "",
      });
    }
  }, [instructor]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`http://localhost:8080/instructor/put/${instructor.instructorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedInstructor = await res.json();
        setInstructor(updatedInstructor);
        localStorage.setItem("loggedInInstructor", JSON.stringify(updatedInstructor));
        setShowSuccessModal(true);
      } else {
        const errText = await res.text();
        setMessage("Update failed: " + errText);
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      {message && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Certification:
          <input name="certification" value={formData.certification} onChange={handleChange} />
        </label>

        <label>
          Yoga Specialty:
          <select name="yogaSpecialty" value={formData.yogaSpecialty} onChange={handleChange} required>
            <option value="">Select specialty</option>
            {yogaSpecialtyOptions.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </label>

        <label>
          Class Preference:
          <input name="classPreference" value={formData.classPreference} onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>

        <label>
          Years of Experience:
          <input type="number" min="0" name="experienceYears" value={formData.experienceYears} onChange={handleChange} />
        </label>

        <fieldset>
          <legend>Styles Offered:</legend>
          {yogaSpecialtyOptions.map((style) => (
            <label key={style} style={{ marginRight: "10px" }}>
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
        </fieldset>

        <label>
          Hourly Rate:
          <input type="number" min="0" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
        </label>

        <label>
          Intro Video URL:
          <input name="introVideoUrl" value={formData.introVideoUrl} onChange={handleChange} />
        </label>

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </label>

        <label>
          Confirm Current Password:
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Profile updated successfully!</p>
            <button onClick={() => setShowSuccessModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;

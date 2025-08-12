import React, { useState } from "react";

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    certification: "",
    yogaSpecialty: "",
    classPreference: "",
    phoneNumber: "",
    experienceYears: "",
    stylesOffered: "",
    hourlyRate: "",
    introVideoUrl: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.certification.trim())
      newErrors.certification = "Certification is required";
    if (!formData.yogaSpecialty.trim())
      newErrors.yogaSpecialty = "Yoga specialty is required";
    if (!formData.classPreference.trim())
      newErrors.classPreference = "Class preference is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone Number is required";

    if (formData.experienceYears && formData.experienceYears < 0)
      newErrors.experienceYears = "Experience cannot be negative";

    if (formData.hourlyRate && formData.hourlyRate < 0)
      newErrors.hourlyRate = "Hourly rate cannot be negative";

    if (
      formData.gender &&
      !["MALE", "FEMALE", "OTHER"].includes(formData.gender)
    ) {
      newErrors.gender = "Invalid gender selection";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch("/addInstructor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          setSubmitted(true);
        }
      } catch (err) {
        console.error("Submission failed", err);
      }
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      certification: "",
      yogaSpecialty: "",
      classPreference: "",
      phoneNumber: "",
      experienceYears: "",
      stylesOffered: "",
      hourlyRate: "",
      introVideoUrl: "",
      gender: ""
    });
  };

  return (
    <div>
      <h2>Apply to Become a Yoga Instructor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        <br />

        <label>
          Certification:
          <input
            name="certification"
            value={formData.certification}
            onChange={handleChange}
          />
        </label>
        {errors.certification && (
          <span style={{ color: "red" }}>{errors.certification}</span>
        )}
        <br />

        <label>
          Yoga Specialty:
          <input
            name="yogaSpecialty"
            value={formData.yogaSpecialty}
            onChange={handleChange}
          />
        </label>
        {errors.yogaSpecialty && (
          <span style={{ color: "red" }}>{errors.yogaSpecialty}</span>
        )}
        <br />

        <label>
          Class Preference:
          <input
            name="classPreference"
            value={formData.classPreference}
            onChange={handleChange}
          />
        </label>
        {errors.classPreference && (
          <span style={{ color: "red" }}>{errors.classPreference}</span>
        )}
        <br />

        <label>
          Phone Number:
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        {errors.phoneNumber && (
          <span style={{ color: "red" }}>{errors.phoneNumber}</span>
        )}
        <br />

        <label>
          Experience Years:
          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
          />
        </label>
        {errors.experienceYears && (
          <span style={{ color: "red" }}>{errors.experienceYears}</span>
        )}
        <br />

        <label>
          Styles Offered (comma separated):
          <input
            name="stylesOffered"
            value={formData.stylesOffered}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Hourly Rate:
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
        </label>
        {errors.hourlyRate && (
          <span style={{ color: "red" }}>{errors.hourlyRate}</span>
        )}
        <br />

        <label>
          Intro Video URL:
          <input
            name="introVideoUrl"
            value={formData.introVideoUrl}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        {errors.gender && (
          <span style={{ color: "red" }}>{errors.gender}</span>
        )}
        <br />

        <button type="submit">Submit Application</button>
      </form>

      {/* Success Modal */}
      {submitted && (
        <div
          role="dialog"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center"
            }}
          >
            <p>Application submitted successfully!</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplyForm;

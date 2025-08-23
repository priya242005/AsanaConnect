// FeedbackForm.jsx
import React, { useState } from "react";

function FeedbackForm({ userId, sessionId, onClose, onFeedbackSubmitted }) {
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comments.trim()) {
      alert("Please provide rating and comments.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `http://localhost:8080/feedback/user/${userId}/session/${sessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comments }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      alert("Feedback submitted successfully!");
      setRating("");
      setComments("");
      onFeedbackSubmitted(); // Notify parent to refresh feedbacks
      onClose(); // Close the modal/form
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "20px 24px",
          borderRadius: "10px",
          maxWidth: "420px",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h3 style={{ margin: 0, marginBottom: "12px", color: "#2563eb", fontWeight: "700", fontSize: "1.5rem", textAlign: "center" }}>
          Submit Feedback
        </h3>

        <label style={{ fontWeight: "600", color: "#1e40af", fontSize: "1rem", display: "flex", flexDirection: "column" }}>
          Rating (1 - 5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            disabled={submitting}
            required
            style={{
              marginTop: "6px",
              padding: "8px 12px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #d1d5db",
              outline: "none",
              transition: "border-color 0.3s ease",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#1f2937",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </label>

        <label style={{ fontWeight: "600", color: "#1e40af", fontSize: "1rem", display: "flex", flexDirection: "column" }}>
          Comments:
          <textarea
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={submitting}
            required
            style={{
              marginTop: "6px",
              padding: "10px 12px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #d1d5db",
              outline: "none",
              transition: "border-color 0.3s ease",
              resize: "vertical",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#1f2937",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            style={{
              padding: "10px 20px",
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "white",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = "#b91c1c")}
            onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = "#ef4444")}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "10px 20px",
              fontWeight: "700",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.6)",
            }}
            onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = "#1e40af")}
            onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = "#2563eb")}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;

import React, { useEffect, useState } from "react";

function FeedbackSection({ instructorId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8080/feedback/instructor/${instructorId}`);
        if (!res.ok) throw new Error("Failed to load feedbacks");
        const data = await res.json();
        // Sort feedback by createdAt descending (newest first)
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeedbacks(data);
      } catch (err) {
        setError(err.message || "Unexpected error");
      }
      setLoading(false);
    }

    if (instructorId) {
      fetchFeedbacks();
    }
  }, [instructorId]);

  if (loading)
    return (
      <p style={{ color: "#2563eb", fontWeight: "bold", textAlign: "center" }}>
        Loading feedback...
      </p>
    );
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!feedbacks.length) return <p style={{ textAlign: "center" }}>No feedback available yet.</p>;

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: 12,
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {feedbacks.map((fb) => (
        <div
          key={fb.feedbackId}
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/customer-hand-review-feedback-five-star-rating-service-product-quality-positive-ranking-background-best-evaluation-user-experience-success-business-rate-finger-point-satisfaction-5-score_79161-2306.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(227, 242, 253, 0.8)",
            backdropFilter: "blur(4px)",
            borderRadius: 18,
            padding: 20,
            boxShadow: "0 4px 22px 0 rgba(37,99,235,0.10), 0 2px 8px 0 rgba(0,0,0,0.10)",
            color: "#18181b",
            maxWidth: 400,
            width: "100%",
          }}
        >
          <h3 style={{ margin: "0 0 8px", color: "#08090cff" }}>
            Session: {fb.session.sessionName}
          </h3>
          <p style={{ margin: "4px 0" }}>
            <strong>Date:</strong>{" "}
            {new Date(fb.createdAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Rating:</strong> {fb.rating} / 5
          </p>
          <p style={{ margin: "8px 0" }}>
            <strong>Comments:</strong> {fb.comments}
          </p>
          <p style={{ fontSize: "0.85rem", color: "#111010ff", marginTop: "auto" }}>
            <em>By: {fb.user.name}</em>
          </p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackSection;

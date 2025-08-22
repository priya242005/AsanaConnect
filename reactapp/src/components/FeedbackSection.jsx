import React from "react";

function FeedbackSection() {
  const dummyFeedbacks = [
    {
      id: 1,
      userName: "Alice Johnson",
      comment: "Great session! Really helped me improve my flexibility.",
      rating: 5,
      date: "2025-07-15",
    },
    {
      id: 2,
      userName: "Bob Smith",
      comment: "Instructor was very clear and supportive.",
      rating: 4,
      date: "2025-07-20",
    },
    {
      id: 3,
      userName: "Clara Lee",
      comment: "Nice pace and explanations. Looking forward to the next class.",
      rating: 5,
      date: "2025-08-01",
    },
  ];

  return (
    <div className="feedback-section">
      <h2>User Feedback</h2>
      {dummyFeedbacks.length === 0 ? (
        <p>No feedback received yet.</p>
      ) : (
        <ul className="feedback-list">
          {dummyFeedbacks.map((fb) => (
            <li key={fb.id} className="feedback-item">
              <p><strong>{fb.userName}</strong> <em>({fb.date})</em></p>
              <p>Rating: {Array(fb.rating).fill("⭐").join("")}</p>
              <p>"{fb.comment}"</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackSection;

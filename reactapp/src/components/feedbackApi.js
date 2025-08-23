

export async function submitFeedbackAPI(userId, sessionId, rating, comments) {
  if (!userId || !sessionId) {
    throw new Error("User ID and Session ID are required.");
  }
  if (rating === undefined || rating === null || !comments) {
    throw new Error("Rating and comments are required.");
  }

  const response = await fetch(
    `http://localhost:8080/feedback/user/${userId}/session/${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comments }),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to submit feedback.");
  }

  return await response.json();
}

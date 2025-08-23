package com.examly.springapp.dto;

import java.time.LocalDateTime;

public class FeedbackDTO {

    private Long feedbackId;
    private Integer rating;
    private String comments;
    private LocalDateTime createdAt;
    private UserBriefDTO user;
    private SessionBriefDTO session;
    private InstructorBriefDTO instructor;

    public FeedbackDTO() {}

    public FeedbackDTO(Long feedbackId, Integer rating, String comments, LocalDateTime createdAt,
                       UserBriefDTO user, SessionBriefDTO session, InstructorBriefDTO instructor) {
        this.feedbackId = feedbackId;
        this.rating = rating;
        this.comments = comments;
        this.createdAt = createdAt;
        this.user = user;
        this.session = session;
        this.instructor = instructor;
    }

    // Getters and setters for all fields
    public Long getFeedbackId() { return feedbackId; }
    public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public UserBriefDTO getUser() { return user; }
    public void setUser(UserBriefDTO user) { this.user = user; }

    public SessionBriefDTO getSession() { return session; }
    public void setSession(SessionBriefDTO session) { this.session = session; }

    public InstructorBriefDTO getInstructor() { return instructor; }
    public void setInstructor(InstructorBriefDTO instructor) { this.instructor = instructor; }

    public static class UserBriefDTO {
        private Long userId;
        private String name;

        public UserBriefDTO() {}

        public UserBriefDTO(Long userId, String name) {
            this.userId = userId;
            this.name = name;
        }
        // Getters and setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class SessionBriefDTO {
        private Long sessionId;
        private String sessionName;

        public SessionBriefDTO() {}

        public SessionBriefDTO(Long sessionId, String sessionName) {
            this.sessionId = sessionId;
            this.sessionName = sessionName;
        }
        // Getters and setters
        public Long getSessionId() { return sessionId; }
        public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
        public String getSessionName() { return sessionName; }
        public void setSessionName(String sessionName) { this.sessionName = sessionName; }
    }

    public static class InstructorBriefDTO {
        private Long instructorId;
        private String name;

        public InstructorBriefDTO() {}

        public InstructorBriefDTO(Long instructorId, String name) {
            this.instructorId = instructorId;
            this.name = name;
        }
        // Getters and setters
        public Long getInstructorId() { return instructorId; }
        public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}

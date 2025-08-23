// SessionDTO.java
package com.examly.springapp.dto;

import java.time.LocalDateTime;

public class SessionDTO {
    private Long sessionId;
    private String sessionName;
    private LocalDateTime sessionTime;
    private Integer durationMinutes;
    private String meetingLink;
    private String emotion;
    private Integer slots;

    public SessionDTO() {}

    public SessionDTO(Long sessionId, String sessionName, LocalDateTime sessionTime,
                      Integer durationMinutes, String meetingLink,
                      String emotion, Integer slots) {
        this.sessionId = sessionId;
        this.sessionName = sessionName;
        this.sessionTime = sessionTime;
        this.durationMinutes = durationMinutes;
        this.meetingLink = meetingLink;
        this.emotion = emotion;
        this.slots = slots;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public LocalDateTime getSessionTime() {
        return sessionTime;
    }

    public void setSessionTime(LocalDateTime sessionTime) {
        this.sessionTime = sessionTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public String getEmotion() {
        return emotion;
    }

    public void setEmotion(String emotion) {
        this.emotion = emotion;
    }

    public Integer getSlots() {
        return slots;
    }

    public void setSlots(Integer slots) {
        this.slots = slots;
    }
}

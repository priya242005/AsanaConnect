package com.examly.springapp.dto;

public class FeedbackCreateDTO {
    private Integer rating; // e.g. 1 to 5
    private String comments;

    public FeedbackCreateDTO() {}

    public FeedbackCreateDTO(Integer rating, String comments) {
        this.rating = rating;
        this.comments = comments;
    }

    // Getters and setters
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
}

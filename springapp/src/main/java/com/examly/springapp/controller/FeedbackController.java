package com.examly.springapp.controller;

import com.examly.springapp.dto.FeedbackCreateDTO;
import com.examly.springapp.dto.FeedbackDTO;
import com.examly.springapp.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

@PostMapping(value = "/user/{userId}/session/{sessionId}", produces = "application/json")
    public ResponseEntity<?> submitFeedback(
            @PathVariable Long userId,
            @PathVariable Long sessionId,
            @RequestBody FeedbackCreateDTO feedbackCreateDTO) {
        try {
            FeedbackDTO savedFeedback = feedbackService.submitFeedback(userId, sessionId, feedbackCreateDTO);
            return ResponseEntity.ok(savedFeedback);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackBySession(@PathVariable Long sessionId) {
        List<FeedbackDTO> feedbackList = feedbackService.getFeedbackForSession(sessionId);
        return ResponseEntity.ok(feedbackList);
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByInstructor(@PathVariable Long instructorId) {
        List<FeedbackDTO> feedbackList = feedbackService.getFeedbackForInstructor(instructorId);
        return ResponseEntity.ok(feedbackList);
    }
}

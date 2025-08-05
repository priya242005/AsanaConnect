package com.examly.springapp.controller;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService service;

    @PostMapping("/add")
    public ResponseEntity<?> addFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(service.addFeedback(feedback));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.ok(service.getAllFeedbacks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFeedbackById(@PathVariable Long id) {
        Feedback feedback = service.getFeedbackById(id);
        return feedback != null ? ResponseEntity.ok(feedback) : ResponseEntity.status(404).body("Feedback not found");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFeedback(@PathVariable Long id, @RequestBody Feedback updated) {
        Feedback feedback = service.updateFeedback(id, updated);
        return feedback != null ? ResponseEntity.ok(feedback) : ResponseEntity.status(404).body("Feedback not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        boolean deleted = service.deleteFeedback(id);
        return deleted ? ResponseEntity.ok("Feedback deleted") : ResponseEntity.status(404).body("Feedback not found");
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(service.getFeedbacksByInstructor(instructorId));
    }

    @GetMapping("/learner/{learnerId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByLearner(@PathVariable Long learnerId) {
        return ResponseEntity.ok(service.getFeedbacksByLearner(learnerId));
    }
}

package com.examly.springapp.service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository repository;

    public Feedback addFeedback(Feedback feedback) {
        return repository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
        return repository.findAll();
    }

    public Feedback getFeedbackById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public boolean deleteFeedback(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public Feedback updateFeedback(Long id, Feedback updated) {
        Feedback existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setRating(updated.getRating());
            existing.setComments(updated.getComments());
            return repository.save(existing);
        }
        return null;
    }

    public List<Feedback> getFeedbacksByInstructor(Long instructorId) {
        return repository.findByInstructorId(instructorId);
    }

    public List<Feedback> getFeedbacksByLearner(Long learnerId) {
        return repository.findByLearnerId(learnerId);
    }
}

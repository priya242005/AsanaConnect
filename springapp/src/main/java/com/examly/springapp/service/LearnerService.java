package com.examly.springapp.service;

import com.examly.springapp.model.Learner;
import com.examly.springapp.repository.LearnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearnerService {

    @Autowired
    private LearnerRepository repository;

    public Learner addLearner(Learner learner) {
        return repository.save(learner);
    }

    public List<Learner> getAllLearners() {
        return repository.findAll();
    }

    public Learner getLearnerById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Learner getLearnerByName(String name) {
        return repository.findByName(name);
    }

    public Learner updateLearner(Long id, Learner updated) {
        Optional<Learner> existing = repository.findById(id);
        if (existing.isPresent()) {
            Learner learner = existing.get();
            learner.setName(updated.getName());
            learner.setEmail(updated.getEmail());
            learner.setPhoneNumber(updated.getPhoneNumber());
            learner.setGender(updated.getGender());
            return repository.save(learner);
        }
        return null;
    }

    public boolean deleteLearner(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}

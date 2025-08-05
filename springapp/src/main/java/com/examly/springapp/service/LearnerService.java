package com.examly.springapp.service;

import com.examly.springapp.model.Learner;
import com.examly.springapp.repository.LearnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearnerService {

    @Autowired
    private LearnerRepo learnerRepository;

    public Learner addLearner(Learner learner) {
        return learnerRepository.save(learner);
    }

    public List<Learner> getAllLearners() {
        return learnerRepository.findAll();
    }

    public Optional<Learner> getLearnerById(Long id) {
        return learnerRepository.findById(id);
    }

    public Learner updateLearner(Long id, Learner updatedLearner) {
        updatedLearner.setId(id);
        return learnerRepository.save(updatedLearner);
    }

    public void deleteLearner(Long id) {
        learnerRepository.deleteById(id);
    }
}

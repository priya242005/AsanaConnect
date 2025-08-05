package com.examly.springapp.service;

import com.examly.springapp.model.WellnessTracker;
import com.examly.springapp.repository.WellnessTrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WellnessTrackerService {

    @Autowired
    private WellnessTrackerRepository repo;

    public WellnessTracker addEntry(WellnessTracker tracker) {
        return repo.save(tracker);
    }

    public List<WellnessTracker> getAll() {
        return repo.findAll();
    }

    public WellnessTracker getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<WellnessTracker> getByLearnerId(Long learnerId) {
        return repo.findByLearnerId(learnerId);
    }

    public WellnessTracker updateEntry(Long id, WellnessTracker updated) {
        WellnessTracker existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setWeight(updated.getWeight());
            existing.setHeight(updated.getHeight());
            existing.setSleepHours(updated.getSleepHours());
            existing.setWaterIntake(updated.getWaterIntake());
            existing.setMood(updated.getMood());
            existing.setTrackedDate(updated.getTrackedDate());
            return repo.save(existing);
        }
        return null;
    }

    public boolean deleteEntry(Long id) {
        WellnessTracker existing = repo.findById(id).orElse(null);
        if (existing != null) {
            repo.delete(existing);
            return true;
        }
        return false;
    }
}

package com.examly.springapp.service;

import com.examly.springapp.model.Emotion;
import com.examly.springapp.repository.EmotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmotionService {

    @Autowired
    private EmotionRepository repo;

    public Emotion addEmotion(Emotion emotion) {
        return repo.save(emotion);
    }

    public List<Emotion> getAllEmotions() {
        return repo.findAll();
    }

    public Emotion getEmotionById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Emotion> getEmotionsByLearner(Long learnerId) {
        return repo.findByLearnerId(learnerId);
    }

    public Emotion updateEmotion(Long id, Emotion updated) {
        Emotion existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setEmotionType(updated.getEmotionType());
            existing.setDate(updated.getDate());
            existing.setNotes(updated.getNotes());
            return repo.save(existing);
        }
        return null;
    }

    public boolean deleteEmotion(Long id) {
        Emotion existing = repo.findById(id).orElse(null);
        if (existing != null) {
            repo.delete(existing);
            return true;
        }
        return false;
    }
}

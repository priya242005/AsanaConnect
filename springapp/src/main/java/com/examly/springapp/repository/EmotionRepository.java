package com.examly.springapp.repository;

import com.examly.springapp.model.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmotionRepository extends JpaRepository<Emotion, Long> {
    List<Emotion> findByLearnerId(Long learnerId);
}

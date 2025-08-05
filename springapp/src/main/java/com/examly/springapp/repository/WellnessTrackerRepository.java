package com.examly.springapp.repository;

import com.examly.springapp.model.WellnessTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WellnessTrackerRepository extends JpaRepository<WellnessTracker, Long> {
    List<WellnessTracker> findByLearnerId(Long learnerId);
}

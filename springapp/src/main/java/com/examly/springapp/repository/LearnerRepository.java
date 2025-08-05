package com.examly.springapp.repository;

import com.examly.springapp.model.Learner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearnerRepository extends JpaRepository<Learner, Long> {
    Learner findByName(String name);
}

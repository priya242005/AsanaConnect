package com.examly.springapp.repository;

import com.examly.springapp.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepo extends JpaRepository<Session, Long> {
    List<Session> findByLearnerId(Long learnerId);
    List<Session> findByInstructorId(Long instructorId);
}

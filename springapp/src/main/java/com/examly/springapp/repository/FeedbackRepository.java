package com.examly.springapp.repository;

import com.examly.springapp.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByUserUserIdAndSessionSessionId(Long userId, Long sessionId);

    List<Feedback> findAllBySessionSessionId(Long sessionId);

    List<Feedback> findAllByInstructorInstructorId(Long instructorId);
    void deleteBySessionSessionId(Long sessionId);
}

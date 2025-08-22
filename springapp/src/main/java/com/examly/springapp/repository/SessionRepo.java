package com.examly.springapp.repository;

import com.examly.springapp.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepo extends JpaRepository<Session, Long> {
    List<Session> findAllByInstructorInstructorId(Long instructorId);
}

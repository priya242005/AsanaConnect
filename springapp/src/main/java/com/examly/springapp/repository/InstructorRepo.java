package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Instructor;
import java.util.Optional;

public interface InstructorRepo extends JpaRepository<Instructor, Long> {
    Optional<Instructor> findByNameIgnoreCase(String name);
}

package com.examly.springapp.repository;

import com.examly.springapp.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepo extends JpaRepository<Slot, Long> {
    List<Slot> findByInstructorId(Long instructorId);
}

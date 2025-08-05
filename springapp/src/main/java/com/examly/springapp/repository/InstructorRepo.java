package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Instructor;

public interface InstructorRepo extends JpaRepository<Instructor,Long> {

}

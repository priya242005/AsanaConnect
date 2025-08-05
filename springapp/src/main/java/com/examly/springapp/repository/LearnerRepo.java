package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Learner;

public interface LearnerRepo extends JpaRepository<Learner,Long>{

}

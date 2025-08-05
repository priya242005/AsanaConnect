package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Admin;

public interface AdminRepo extends JpaRepository<Admin,Long>{

}

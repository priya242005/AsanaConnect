package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public User addUser(User user) {
        // Add validation or password encryption here as needed
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public User updateUser(Long id, User updated) {
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setEmail(updated.getEmail());
            if (updated.getPassword() != null && !updated.getPassword().isEmpty()) {
                existing.setPassword(updated.getPassword());  // Update password if provided
            }
            return repo.save(existing);
        }).orElse(null);
    }

    public boolean deleteUser(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    // Authenticate by name (username) and password
    public boolean authenticate(String name, String password) {
        return repo.findByName(name)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }

    // Fetch user by name (username)
    public User getUserByName(String name) {
        return repo.findByName(name).orElse(null);
    }

    // New method for password update with verification
    public boolean updatePassword(Long userId, String currentPassword, String newPassword) {
        return repo.findById(userId).map(user -> {
            if (user.getPassword().equals(currentPassword)) {  // Verify current password
                user.setPassword(newPassword);
                repo.save(user);
                return true;
            }
            return false; // Current password mismatch
        }).orElse(false);
    }
}

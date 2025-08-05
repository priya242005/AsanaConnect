package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public User addUser(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public User updateUser(Long id, User updatedUser) {
        Optional<User> optionalUser = repo.findById(id);
        if (optionalUser.isPresent()) {
            User existing = optionalUser.get();
            existing.setName(updatedUser.getName());
            existing.setEmail(updatedUser.getEmail());
            existing.setPhone(updatedUser.getPhone());
            existing.setPasswordHash(updatedUser.getPasswordHash());
            existing.setLoyaltyTier(updatedUser.getLoyaltyTier());
            existing.setGender(updatedUser.getGender());
            return repo.save(existing);
        }
        return null;
    }

    public boolean deleteUser(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}

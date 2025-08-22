package com.examly.springapp.service;

import com.examly.springapp.model.Admin;
import com.examly.springapp.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo repo;

    public Admin addAdmin(Admin admin) {
        return repo.save(admin);
    }

    public Optional<Admin> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public List<Admin> getAllAdmins() {
        return repo.findAll();
    }

    // Update password only if currentPassword matches the existing one
    public boolean updatePassword(Long id, String currentPassword, String newPassword) {
        Optional<Admin> adminOpt = repo.findById(id);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (!admin.getPassword().equals(currentPassword)) {
                // Current password is incorrect
                return false;
            }
            admin.setPassword(newPassword);
            repo.save(admin);
            return true;
        }
        // Admin not found
        return false;
    }
}

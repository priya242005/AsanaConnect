package com.examly.springapp.controller;

import com.examly.springapp.model.Admin;
import com.examly.springapp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/add")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        Admin saved = service.addAdmin(admin);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        Optional<Admin> adminOpt = service.findByUsername(admin.getUsername());
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(admin.getPassword())) {
            Admin found = adminOpt.get();
            found.setPassword(null); // hide password from response
            return ResponseEntity.ok(found);
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(service.getAllAdmins());
    }

    // Request body now expects an object containing currentPassword and newPassword
    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody PasswordUpdateRequest request) {
        boolean updated = service.updatePassword(id, request.getCurrentPassword(), request.getNewPassword());
        if (updated) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(400).body("Current password is incorrect or admin not found");
        }
    }

    // Helper class to deserialize the password change request JSON
    public static class PasswordUpdateRequest {
        private String currentPassword;
        private String newPassword;

        public String getCurrentPassword() {
            return currentPassword;
        }
        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }
        public String getNewPassword() {
            return newPassword;
        }
        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}

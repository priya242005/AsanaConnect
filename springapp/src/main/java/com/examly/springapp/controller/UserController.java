package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        User saved = service.addUser(user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = service.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(404).body("User not found");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updated) {
        User user = service.updateUser(id, updated);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(404).body("User not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean deleted = service.deleteUser(id);
        return deleted ? ResponseEntity.ok("User deleted successfully") : ResponseEntity.status(404).body("User not found");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        if (user.getName() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password required");
        }

        boolean authenticated = service.authenticate(user.getName(), user.getPassword());
        if (authenticated) {
            User found = service.getUserByName(user.getName());
            if (found != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", found.getUserId());
                response.put("name", found.getName());
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    // New endpoint for password update
    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> passwords) {
        String currentPassword = passwords.get("currentPassword");
        String newPassword = passwords.get("newPassword");

        if (currentPassword == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Both currentPassword and newPassword are required");
        }

        boolean updated = service.updatePassword(id, currentPassword, newPassword);
        if (updated) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password is incorrect or update failed");
        }
    }
}
